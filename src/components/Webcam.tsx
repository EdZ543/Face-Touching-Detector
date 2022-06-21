import { useEffect } from "react";

const handTrack = require("handtrackjs");

const Webcam = (props: any) => {
  useEffect(() => {
    let model: any;
    let video: HTMLVideoElement;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let warningText: HTMLHeadingElement;
    let alertDelay = 5; // Delay between alerts, in seconds
    let lastAlert = new Date(0).getTime();

    function alert() {
      if (props.notifications) {
        new Notification("Face Touching Detected!");
      }
    }

    function overlapping(predA: any, predB: any) {
      // bbox: [x, y, width, height]
      const bboxA = predA.bbox,
        bboxB = predB.bbox;

      // If one box is to the left of the other, no overlap
      if (bboxA[0] > bboxB[0] + bboxB[2] || bboxB[0] > bboxA[0] + bboxA[2])
        return false;

      // If one box is above the other, no overlap
      if (bboxA[1] > bboxB[1] + bboxB[3] || bboxB[1] > bboxA[1] + bboxA[3])
        return false;

      return true;
    }

    async function render() {
      const predictions = await model.detect(video);

      model.renderPredictions(predictions, canvas, context, video);

      let facePreds = [],
        handPreds = [];

      for (let i = 0; i < predictions.length; i += 1) {
        if (predictions[i].label === "face") {
          facePreds.push(predictions[i]);
        } else {
          handPreds.push(predictions[i]);
        }
      }

      warningText.style.color = "white";
      warningText.textContent = "Face Touching Not Detected :)";

      for (let i = 0; i < facePreds.length; i += 1) {
        for (let j = 0; j < handPreds.length; j += 1) {
          if (overlapping(facePreds[i], handPreds[j])) {
            let now = new Date().getTime();
            if ((now - lastAlert) / 1000 > alertDelay) {
              alert();

              lastAlert = now;
            }

            // Change warning text
            warningText.style.color = "red";
            warningText.textContent = "Face Touching Detected!";

            // Break out of both loops
            j = handPreds.length;
            break;
          }
        }
      }

      video.requestVideoFrameCallback(render);
    }

    async function start() {
      // Get HTML elements
      let loadingIcon = document.getElementById(
        "loading-icon"
      ) as HTMLImageElement;
      video = document.getElementById("video") as HTMLVideoElement;
      canvas = document.getElementById("canvas") as HTMLCanvasElement;
      context = canvas!.getContext("2d") as CanvasRenderingContext2D;
      warningText = document.getElementById("warning") as HTMLHeadingElement;

      // Start video
      handTrack.startVideo(video);

      // Load model
      model = await handTrack.load();

      // Start rendering predictions
      video.addEventListener("loadeddata", () => {
        loadingIcon.style.display = "none";
        canvas.style.display = "block";

        video.requestVideoFrameCallback(render);
      });
    }

    start();

    return function cleanup() {
      if (video) handTrack.stopVideo(video);
      if (model) model.dispose();
    };
  }, [props]);

  return (
    <div className="flex" id="webcam-container">
      <video id="video" hidden />
      <img
        id="loading-icon"
        src="assets/spinning-wheel-of-death.png"
        alt="loading icon"
      />
      <canvas id="canvas" />
      {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
      <h2 id="warning" />
    </div>
  );
};

export default Webcam;
