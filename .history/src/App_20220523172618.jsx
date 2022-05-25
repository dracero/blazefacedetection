import "./App.css";
import Webcam from "react-webcam";
// import blazeface from "@tensorflow-models/blazeface";
import drawFaceContainer from "./utils";
import { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

function App() {
  const camRef = useRef(null);
  const cxtRef = useRef(null);

  useEffect(() => {
    const timerIntervalId = setInterval(() => {
      (async () => {
        const net = await blazeface.load();
        const returnTensors = false;

        if (
          camRef.current !== null &&
          camRef.current.video.readyState === 4 &&
          typeof camRef.current !== undefined
        ) {
          const { video } = camRef.current;
          const webcam = await tf.data.webcam(video);
          const { videoWidth, videoHeight } = video;
          cxtRef.current.width = videoWidth;
          cxtRef.current.height = videoHeight;
          const detections = await net.estimateFaces(webcam, returnTensors);
          console.log(detections)
          /*const cxt = cxtRef.current.getContex("2d");
          drawFaceContainer(cxt, detections);*/
        }
      })();
    }, 100);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <Webcam
          id="webcam"
          className="app__webcam"
          muted
          audio={false}
          autoPlay
          ref={camRef}
        />
        <canvas className="app__canvas" ref={cxtRef}></canvas>
      </div>
      <h1>
        Face Detector AI <span>--Crispen Gari</span>
      </h1>
    </div>
  );
}

export default App


