import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css';

import {getTranscript} from "../lib/assemblyai"


// Data that I can receive
// id: 'o9yi9knyjh-b508-45a3-943a-917ab81a225f',
//     resource_url: 'https://api.assemblyai.com/v2/transcript/o9yi9knyjh-b508-45a3-943a-917ab81a225f',
//     status: 'completed',
//     created: '2022-09-17T20:18:35.336019',
//     completed: '2022-09-17T20:18:48.292910',
//     audio_url: 'https://bit.ly/3yxKEIY'



export default function ViewTranscriptCard({id,created}) {
  const [transcriptData, setTranscriptData] = useState("")

  async function getTranscriptData(id) {
    const transcript = await getTranscript(id)
    setTranscriptData(transcript.data.text)
  }

  useEffect(() => {
    if (id) {
      getTranscriptData(id)
    }
  }, [id])


    return (
        <a className={styles.card}>
              <p className='text-lg font-bold	'>{id}</p>
              <hr/>
              <p>{transcriptData}</p>
              {/* <p>{created}</p> */}
              <button className='bg-slate-200 hover:bg-slate-400 py-2 px-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </button>
        </a>
    )
}