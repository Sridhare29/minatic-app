import MinaticLayout from '@/components/dashboard/minaticLayout';
import TranscriptContainer from '@/components/dashboard/TranscriptContainer';
import { SelectField, TextField } from '@/components/Fields';
import { useContext, useEffect, useState } from 'react';

import {getTranscript} from '@/lib/assemblyai';
import ExportTranscriptButton from '@/components/dashboard/ExportTranscriptButton';
import { Button } from '@/components/Button';


// Get transcript data
// export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const data = await getTranscript_demo()
//   const transcripts = data.data;

//   const speakerSets = new Set()
//   data.data.utterances.map(item => {
//     speakerSets.add(item.speaker);
//   })
//   const speakers = [...speakerSets];

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//         transcripts,
//         speakers
//     },
//   }
// }


export async function getServerSideProps(context) {
    const id = context.query.data
    const title = context.query.title
    const type = context.query.type
    const date = context.query.date


    const data = await getTranscript(id);
    const transcripts = data.data;

    const speakerSets = new Set()
    data.data.utterances.map(item => {
        speakerSets.add(item.speaker);
    })
    const speakers = [...speakerSets];

      return {
        props: {
            transcripts,
            speakers,
            title,
            type,
            date
        }
    }
}

export default function View({transcripts, speakers, title, type, date}) {

    const [transcript, setTranscript] = useState(transcripts.utterances);

    
      const [oldName, setOldName] = useState(speakers);
      const [speakerNameIndex, setSpeakerNameIndex ] = useState(0);
      const [newName, setNewName] = useState("");
    
      const handleChangeName = (newName) => {
        
        console.log(transcript)
        const updatedTranscript = transcript.map(line => {
          if (line.speaker === oldName[speakerNameIndex]) {
            return { ...line, speaker: newName };
          }
          return line;
        });

        const newState = oldName.map(name => {
            if (name == oldName[speakerNameIndex]) {
              return newName;
            }
            // 👇️ otherwise return the object as is
            return name;
          });
          setOldName(newState)

        setTranscript(updatedTranscript);
      };

    return (
        <>
            <MinaticLayout>
            {/* <audio className="col-auto w-50" id='player' controls='controls' src={url}/> */}
                <div className='grid grid-flow-col auto-cols-max gap-4'>
                    <div>
                        <div id='transcription' className='max-h-screen border border-2 overflow-auto'>
                            {/* FIXME: Update Speaker Card UI */}                      
                            <TranscriptContainer transcript={transcript} />
                        </div>
                    </div>
                    <div>
                        {/* Hello Meeting details */}
                        <div className='border border-2 bg-white shadow sm:rounded-lg mb-4'>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Meeting Details</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                    <p>Meeting Title: {title}</p>
                                    <p>Meeting Type: {type}</p>
                                    <p>Meeting Date: {date}</p>
                                </div>
                            </div>
                        </div>

                        <div className='border border-2 bg-white shadow sm:rounded-lg mb-4'>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Change Speaker Name</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                    {/* FIXME: UPDATE UI */}
                                    <SelectField onChange={e => setSpeakerNameIndex(e.target.value)}>
                                    {oldName.map((name, index) => (
                                        <option key={index} value={index}>
                                            {name}
                                        </option>
                                        ))}
                                    </SelectField>

                                    <TextField
                                    type="text"
                                    placeholder="Enter new name"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    />
                                    <Button onClick={() => handleChangeName(newName)} color='blue'>
                                    Change {oldName[speakerNameIndex]} to {newName}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className='border border-2 bg-white shadow sm:rounded-lg mb-4'>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Export</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                   {/* TODO: Able to provide export functionality */}
                                   <ExportTranscriptButton title={title} type={type} date={date} transcript={transcripts} utterances={transcript} />
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </MinaticLayout>
        </>
    )
}