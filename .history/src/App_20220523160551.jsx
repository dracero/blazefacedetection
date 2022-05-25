import { useState } from 'react'
import Webcam from "react-webcam";
import drawFaceContainer from "./utils";
import { useEffect, useRef } from "react";
import blazeface from "@tensorflow-models/blazeface";
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState()

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
