import MinaticLayout from '@/components/dashboard/minaticLayout';
import TranscriptContainer from '@/components/dashboard/TranscriptContainer';
import { SelectField } from '@/components/Fields';
import { useState } from 'react';

import {getTranscript_demo} from '@/lib/assemblyai';
import ExportTranscriptButton from '@/components/dashboard/ExportTranscriptButton';

// Get transcript data
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const data = await getTranscript_demo()
  const transcripts = data.data;

  const speakerSets = new Set()
  data.data.utterances.map(item => {
    speakerSets.add(item.speaker);
  })
  const speakers = [...speakerSets];

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
        transcripts,
        speakers
    },
  }
}

export default function View({transcripts, speakers}) {

    


    // update audioplayer data
    // update transcript state
    


    const [transcript, setTranscript] = useState(transcripts);
    
      const [oldName, setOldName] = useState(speakers);
      const [speakerNameIndex, setSpeakerNameIndex ] = useState(0);
      const [newName, setNewName] = useState("");
    
      const handleChangeName = (newName) => {
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

    //   const handleSelectSpeakerChange = (speakerNameIndex) => {
    //     console.log("speaker " + oldName[speakerNameIndex] + " selected")
    //   }


    return (
        <>
            <MinaticLayout>
            <audio className="col-auto w-50" id='player' controls='controls'/>
                <div className='grid grid-flow-col auto-cols-max gap-4'>
                    <div>
                        <div id='transcription' className='max-h-screen border border-2 overflow-auto'>
                            {/* FIXME: Update Speaker Card UI */}                      
                            <TranscriptContainer transcript={transcript.utterances} />
                        </div>
                    </div>
                    <div>
                        {/* Hello Meeting details */}
                        <div className='border border-2 bg-white shadow sm:rounded-lg mb-4'>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Meeting Details</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                    <p>Title: Morning Check-in</p>
                                    <p>Meeting Type: Check-in Meeting</p>
                                    <p>Date: 22/03/2023</p>
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

                                    Coming Soon!
                                    <input
                                    type="text"
                                    placeholder="Enter new name"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    />
                                    <button onClick={() => handleChangeName(newName)}>
                                    Change {oldName} to {newName}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='border border-2 bg-white shadow sm:rounded-lg mb-4'>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Export</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                   {/* TODO: Able to provide export functionality */}
                                   Coming Soon!
                                   <ExportTranscriptButton transcript={transcript} />
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </MinaticLayout>
        </>
    )
}