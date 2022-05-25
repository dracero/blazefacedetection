import { useState } from 'react'
import Webcam from "react-webcam";
import drawFaceContainer from "./utils";
import { useEffect} from "react";
import blazeface from "@tensorflow-models/blazeface";
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState()
  useEffect(() => {
    const timerIntervalId = setInterval(() => {
      (async () => {
        const net = await blazeface.load();
        const returnTensors = !true;

        if (
          camRef.current !== null &&
          camRef.current.video.readyState === 4 &&
          typeof camRef.current !== undefined
        ) {
          const { video } = camRef.current;
          const { videoWidth, videoHeight } = video;
          cxtRef.current.width = videoWidth;
          cxtRef.current.height = videoHeight;

          const detections = await net.estimateFaces(video, returnTensors);

          const cxt = cxtRef.current.getContex("2d");

          drawFaceContainer(cxt, detections);
        }
      })();
    }, 100);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  const videoConstraints = {
    width: 200,
    height: 113,
    facingMode: "user"
  };
  
  const WebcamCapture = () => (
    <Webcam
      audio={false}
      height={113}
      screenshotFormat="image/jpeg"
      width={200}
      videoConstraints={videoConstraints}
    >
      {({ getScreenshot }) => (
        <button
          onClick={() => {
            setImgSrc(getScreenshot())
          }}
        >
          Photo
        </button>

      )}
    </Webcam>
  );
  
  return (
    <div className="App">
      <header className="App-header">
      {WebcamCapture()}  
      <img
          src={imgSrc}
        />
      </header>
    </div>
  )
}

export default App
