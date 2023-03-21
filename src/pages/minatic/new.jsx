import Head from 'next/head'
import Link from 'next/link'


import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { DatePickerField, SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import Router from 'next/router'
import { getTranscript, getTranscriptionID, uploadMeetingAudio } from '@/lib/assemblyai'
import { useState } from 'react'
import Notification from '@/components/dashboard/Notification'
import Datepicker from 'react-tailwindcss-datepicker'


export default function New() {

  const [isNotified, setIsNotified] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [header, setHeader] = useState("")
  const [children, setChildren] = useState("")

  const [dateValue, setDateValue] = useState({ 
    startDate: null,
    endDate: null 
    }); 

    const handleDateValueChange = (newValue) => {
      console.log("newValue:", newValue); 
      setDateValue(newValue); 
      } 

  // submit handler
  const submitNewMeeting = async (e) => {
    e.preventDefault();

    const title = e.target[0].value
    const audioFile = e.target[1].files[0] // path of file
    const type = e.target[2].value
    const email = e.target[3].value

    // submit file data to assembly ai to get transcript data

    // Show loading bar indication
    setHeader("Receiving Audio")
    setIsNotified(true)


    uploadMeetingAudio(audioFile)
      .then((uploadData) => {
        // get transcription data
        setHeader("Audio Received. Processing Audio to transcribe")
        getTranscriptionID(uploadData.data.upload_url)
          .then((res) => {
            const id = res.data.id;
            // get data transcript data
            pollData(id, title, type  )
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
  
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  async function pollData(id, title, type) {
    
    setHeader("Processing Transcription")
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
      
      // Show transcription done in UI!
      // Update loading to tick
      setHeader("Transcription complete. Displaying data now.")
      setIsComplete(true)
      await delay(1000);
      setIsNotified(false)
      
      Router.push({
            pathname: '/minatic/view',
            query: { data: id, title: title, type: type, date: dateValue.startDate}
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
        <Notification isComplete={isComplete} isNotified={isNotified} setIsNotified={setIsNotified} header={header} >{children}</Notification>
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

          <DatePickerField label="Meeting Date" displayFormat={"DD/MM/YYYY"} asSingle={true} value={dateValue} onChange={handleDateValueChange} />
          {/* <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          /> */}
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
