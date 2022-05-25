import { useState } from 'react'
import Webcam from "react-webcam";
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const videoConstraints = {
    width: 1280,
    height: 720,
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
            const imageSrc = getScreenshot()
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
      {getScreenshot()}
      </header>
    </div>
  )
}

export default App
