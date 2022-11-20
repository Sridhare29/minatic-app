import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// import styles from '../../../styles/Home.module.css'

import {uploadMeetingAudio, getTranscriptionID, getTranscript} from '../../lib/assemblyai';
import ViewTranscript from '../../components/ViewTranscript';
import ExportTranscript from '../../components/ExportTranscript';

//TODO: Plug login creditinals capability
// import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Beta({session}) {

    const [inputFile, setInputFile] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const [loadingMessage, setLoadingMessage] = useState("")

    const [transcript, setTranscript] = useState(null)
    const [viewTranscription, setViewTranscription] = useState(false)

    setViewTranscription

    function onFileUploadChange(e) {
        
        // Get audio data
        var target = e.currentTarget;
        var file = target.files[0];
        setInputFile(file)

        setAudioFile(file)
        
        // provide audio playback
        var reader = new FileReader();
        if (target.files && file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById("player").src = e.target.result;
                    
                }
                reader.readAsDataURL(file);
            }
    }


      // Upload the Audio File and retrieve the Upload URL
  // then getTranscriptionID -> pollData
  useEffect(() => {
    if (audioFile) {
      console.log("Receiving Meeting Audio")
      setLoadingMessage("Receiving Meeting Audio")
      uploadMeetingAudio(audioFile)
        .then((res) => {
          console.log("Meeting Audio Received. Getting Transcription Data.")
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
    
    console.log(transcript)
    setTranscript(transcript.data)

    const transcriptStatus = transcript.data.status

    if (transcriptStatus !== "completed") {
      console.log(`Transcript Status: ${transcriptStatus}`)
    } else if (transcriptStatus === "completed") {
     
      console.log("\nTranscription completed!\n")
      // Completed transcription - remove loadingbar
      

      setAudioFile(null)
      setViewTranscription(true)
      
      // console.log(`Your transcribed text:\n\n${transcriptText}`)
      clearInterval(checkCompletionInterval)
    }
  }, 5000)
}

    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Head>
          <title>Minatic Beta Upload</title>
          <meta name="google-site-verification" content="MJ_yxEc15CNe0xt795x_8pnIOJ8iMdt7urt_vGJ9WrE" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Minatic</span> Beta </h1>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-1" >Upload your recorded meeting ( in .mp3 format only )</p>
              <p className="text-sm text-red-600 mb-8" >Please keep your meeting upload to 15-20 minutes maximum.</p>

  
              {/* Meeting Upload/Playback */}
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="btn rounded-full text-white bg-blue-400 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                  <input onChange={onFileUploadChange} type = "file" name="file" id="song" accept = ".mp3"/>
                  <audio id='player' controls='controls'/>
                </div>

                
                
              </div>

              {audioFile && (
                <div className='m-4'>
                <svg aria-hidden="true" className="max-w-3xl mx-auto w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                
                <span className="sr-only">Loading...</span>
                <p>{loadingMessage}</p>
              </div>
              ) }

              {viewTranscription && ( 
                <>
                  <ViewTranscript transcript = {transcript}/>
                  <ExportTranscript 
                    transcript={transcript}
                  />
                </>
                 )}

              


              {/* TODO: EXPORT AS WORD DOC */}
              {/* TODO: Upload to Google Drive */}

            </div>

          </div>

        </div>

      </div>
    )
              }