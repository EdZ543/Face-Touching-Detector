import { useEffect } from "react";
const handTrack = require("handtrackjs");

let video: HTMLVideoElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let model: any;

async function render() {
  const predictions = await model.detect(video);

  model.renderPredictions(predictions, canvas, context, video);

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
