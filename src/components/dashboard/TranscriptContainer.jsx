
import Speaker from "./Speaker"

export default function TranscriptContainer({transcript}) {
    return (
        <>
        {transcript.map((line,index) => (
            <Speaker key={index} speaker={line.speaker} text={line.text} />
        ))}

        </>
    )
    
}