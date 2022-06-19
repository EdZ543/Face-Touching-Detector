import { useEffect } from "react";
const handTrack = require("handtrackjs");

let video: HTMLVideoElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let model: any;

interface Prediction {
  bbox: number[];
}

function overlapping(predA: Prediction, predB: Prediction) {
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

  for (let i = 0; i < facePreds.length; i += 1) {
    for (let j = 0; j < handPreds.length; j += 1) {
      if (overlapping(facePreds[i], handPreds[j])) {
        console.log("Face and hand overlapping");
      }
    }
  }

  requestAnimationFrame(render);
}

async function start() {
  // Get HTML elements
  video = document.getElementById("video") as HTMLVideoElement;
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  context = canvas!.getContext("2d") as CanvasRenderingContext2D;

  // Start video
  handTrack.startVideo(video);

  // Load model
  model = await handTrack.load();

  // Start rendering predictions
  video.addEventListener("loadeddata", () => {
    console.log("Video loaded");
    render();
  });
}

const Webcam = () => {
  useEffect(() => {
    start();

    return function cleanup() {
      if (video) handTrack.stopVideo(video);
      if (model) model.dispose();
    };
  }, []);

  return (
    <canvas id="canvas">
      <video id="video" hidden />
    </canvas>
  );
};

export default Webcam;
