import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css';
import Image from 'next/image'


export default function ViewTranscript({transcript}) {

    console.log(transcript)

    function displayUtterance(utterance) {
        return (
            <div key={utterance.start} className="flex flex-row m-1">
                <h2 className='flex-none font-bold'>Speaker {utterance.speaker}:</h2>
                <p className='flex-grow pl-2 text-left'>{utterance.text}</p>
            </div>
        )

    }

    return (
        <>
                    <div className='flex flex-col mx-4'>
                        {/* <p>{transcript.summary}</p> */}

                        {transcript.utterances.map(displayUtterance)}
                    </div>
        </>
    )
}