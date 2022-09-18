import React from 'react'
import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"

//const assemblyai = require('@phillipchaffee/assemblyai-v2-node-sdk');
//const client = new assemblyai.AssemblyClient('224ddc6c7759424780cd544db3b788c6');

export default function Recorder({passAudioFile}) {

  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)

        //TODO: Pass to assembly file here
        passAudioFile(file)


      })
      .catch((e) => console.log(e))
  }

  return (
    <>

        <audio ref={audioPlayer} src={blobURL} controls='controls' />
        <div>
            <button disabled={isRecording} onClick={startRecording} className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full">
                Start Meeting
            </button>
            <button disabled={!isRecording} onClick={stopRecording} className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-full">
            Finish Meeting
            </button>
            {/* <button>SUBMIT</button> */}
        </div>
    </>
  )

}