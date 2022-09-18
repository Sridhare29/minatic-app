import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import MicRecorder from '../../components/Recorder';
import { useEffect, useState, useRef } from "react"

import {uploadMeetingAudio, getTranscriptionID, getTranscript} from '../../lib/assemblyai';

export default function Start() {

  // State Variables
  const [audioFile, setAudioFile] = useState(null)
  const [uploadURL, setUploadURL] = useState("")
  const [transcript,setTranscript] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("")

  const [isUploading, setIsUploading] = useState(false)

  // textarea
  function handleChange(event) {
    setTranscript(event.target.value)
  }

  // recieve audio file from mic
  function  passAudioFile(url) {
    setIsUploading(true)
    setAudioFile(url)
  }

  // Upload the Audio File and retrieve the Upload URL
  // then getTranscriptionID -> pollData
  useEffect(() => {
    if (audioFile) {
      setLoadingMessage("Receiving Meeting Audio")
      uploadMeetingAudio(audioFile)
        .then((res) => {
          setLoadingMessage("Meeting Audio Received. Getting Transcription Data.")
          getTranscriptionID(res.data.upload_url)
          .then((res) => {
            pollData(res.data.id)
          })
        })
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // Poll Assembly AI Data to retrieve
  async function pollData(id) {
    // Interval for checking transcript completion
  const checkCompletionInterval = setInterval(async () => {
    const transcript = await getTranscript(id)
    const transcriptStatus = transcript.data.status

    if (transcriptStatus !== "completed") {
      console.log(`Transcript Status: ${transcriptStatus}`)
    } else if (transcriptStatus === "completed") {
      setIsUploading(false)
      console.log("\nTranscription completed!\n")
      let transcriptText = transcript.data.text
      setTranscript(transcript.data.text)
      console.log(`Your transcribed text:\n\n${transcriptText}`)
      clearInterval(checkCompletionInterval)
    }
  }, 5000)
}
    return (
        <>
        
        <main className={styles.main}>
        <h1 className={styles.title}>
        <a href="#">Start</a> Meeting Page
        </h1>

        <MicRecorder 
          passAudioFile = {passAudioFile}
        />

        { isUploading ? (
          <div role="status">
            <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-300 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
             </svg>
            <span className="sr-only">Loading...</span>
            <p>{loadingMessage}</p>
          </div>
          ) : 
          (<></>)}



        <textarea className='form-textarea rounded text-slate-500' rows="4" cols="50" 
        placeholder='Your Transcription will be mentioned here' value={transcript} onChange={handleChange} />

        {/* <button className='bg-slate-100 hover:bg-slate-300 py-2 px-4 rounded-full'>Email Transcription</button>
        <button className='bg-slate-100 hover:bg-slate-300 py-2 px-4 rounded-full'>Save Transcript</button> */}

        <div className={styles.grid}>

          <Link href="/">
            <a className={styles.card}>
              <p>Back Home</p>
            </a>
          </Link>
          
        </div>
      </main>


        </>
    )
    
}