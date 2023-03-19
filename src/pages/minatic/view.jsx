import MinaticLayout from '@/components/dashboard/minaticLayout';
import TranscriptContainer from '@/components/dashboard/TranscriptContainer';
import { SelectField } from '@/components/Fields';
import { useState } from 'react';

export default function View() {

    const [transcript, setTranscript] = useState([
        { speaker: "Speaker A", text: "This is a test." },
        { speaker: "Speaker B", text: "This is another test." },
        { speaker: "Speaker A", text: "This is a third test." }
      ]);
    
      const [oldName, setOldName] = useState(["Speaker A", "Speaker B"]);
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
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <div id='transcription' className='border border-2'>
                        <audio className="col-auto w-50" id='player' controls='controls'/>
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
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </MinaticLayout>
        </>
    )
}