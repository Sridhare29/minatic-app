import Head from 'next/head'
import Link from 'next/link'


import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import axios from 'axios'
import Router from 'next/router'
import { getTranscript, getTranscriptionID, uploadMeetingAudio } from '@/lib/assemblyai'
import { useState } from 'react'


export default function New() {

  
  const [transcripts, setTranscription] = useState({})
  const [formData, setFormData] = useState(null)

  const submitNewMeeting = async (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    //console.log(e.target[1].files[0]); //path of file
    console.log(e.target[2].value);
    console.log(e.target[3].value);

    const audioFile = e.target[1].files[0]
    console.log(audioFile);
    //TODO: 

    // submit file data to assembly ai to get transcript data
    console.log("Receiving Meeting Audio")
    uploadMeetingAudio(audioFile)
      .then((res) => {
        // get transcription data
        console.log("Meeting Audio Received. Getting Transcription Data.")
        getTranscriptionID(res.data.upload_url)
          .then((res) => {
            const id = res.data.id;
            // get data transcript data
            setFormData({
              "title": e.target[0].value,
              "file": e.target[1].files[0],
              "type": e.target[2].value,
              "email": e.target[3].value,
            })
            localStorage.setItem("audio",JSON.stringify(e.target[1].files[0]))

            pollData(id)
          })
          .catch((err) => {
            // TODO: show error to user to try again
            console.log(err)
          })
      }).catch((err) => console.log(err))
    // pass form data + transcript data to view.jsx using router


    // const formData = new FormData()
    // formData.append('title', e.target[0].value)
    // // formData.append('file', e.target[1].files[0])

    // Array.from(e.target[1].files).forEach((file) => {
    //   formData.append('file', file);
    // });

    // const response = await axios.post("/api/hello", formData, {
    //   method: 'POST',
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   // },
    //   headers: { 'content-type': 'multipart/form-data' }
    // })
    // console.log('response', response.data);
  }

  async function pollData(id) {
  
    // poll transcript data <-
  const checkCompletionInterval = setInterval(async () => {
    const transcript = await getTranscript(id);
    const transcriptStatus = transcript.data.status
  
    if (transcriptStatus !== "completed") {
      // show message
      console.log(`Transcript Status: ${transcriptStatus}`)
  
    } else if (transcriptStatus === "completed") {
      console.log(transcript);
      console.log("\nTranscription completed!\n")
      clearInterval(checkCompletionInterval)
  
      const speakerSets = new Set()
      transcript.data.utterances.map(item => {
                  speakerSets.add(item.speaker);
                })
                const speakers = [...speakerSets];
  
          const transcripts = transcript.data;

          Router.push({
                pathname: '/minatic/view',
                query: { data: id,  }
              })
    }
  
  
  }, 5000)
  }




  return (
    <>
      <Head>
        <title>Minatic Demo</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Demo Setup
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Use your recent meetings recording (max 20mins) to try Minatic!
            </p>
          </div>
        </div>
        <form
          //action="/api/hello"
          method='POST'
          onSubmit={submitNewMeeting}
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField
            className='col-span-full'
            label="Meeting title"
            id="meeting_title"
            name="meeting_title"
            type="text"
            autoComplete="meeting_title"
            placeholder="Morning Meeting"
            required
          />
          <TextField
            className="col-span-full"
            label="Upload Meeting Recording (mp3,mp4 files only)"
            id="meeting_file"
            name="meeting_file"
            type="file"
            accept = ".mp3"
            required
          />
          <SelectField
            className="col-span-full"
            label="Meeting Type"
            id="meeting_type"
            name="meeting_type"
          >
            <option>Check-in Meeting</option>
            <option>Problem-Solving Meeting</option>
            <option>Team-Building Meeting</option>
            <option>1-On-1 Meetings</option>
            <option>Quarterly Planning Meetings</option>
            <option>Decision-Making Meetings</option>
          </SelectField>
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <div className="col-span-full">
            <Button
              //href='/minatic/view'
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Minatic my Meeting <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
