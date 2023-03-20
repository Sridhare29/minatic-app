import React, { useEffect, useState } from 'react'
import { saveAs } from "file-saver";
import { Header, Packer, Paragraph, TextRun, Document, Footer, AlignmentType, HeadingLevel, LineRuleType } from "docx";

export default function ExportTranscriptButton({transcript}) {


    function exportDocument() {
        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "meeting_summarised.docx");
            console.log("Document created successfully");
          });
    }

    function displayDateHeader(){
        return new Header({
            children: [
                new Paragraph({
                text: "Date here",
                alignment: AlignmentType.LEFT
                })
            ]
        })
    }

    function displayTitle(Title){
        return new Paragraph({
            text: Title,
            bold:true,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
        })
    }


    function displaySummary(summary){
        return new Paragraph({
            text: summary,
            bold:true,
            alignment: AlignmentType.LEFT,
            spacing: {
                after: 200,
            }
        })
    }

    function displayTranscription(utterances){
        return utterances.flatMap(utterance => {
            return [
                new Paragraph({
                    text:utterance.speaker,
                    heading: HeadingLevel.HEADING_3,
                    alignment: AlignmentType.LEFT
                }),
                new Paragraph({
                    text: utterance.text,
                    alignment: AlignmentType.LEFT
                }),
            ]
        })
    }

    function displayFooter() {
        return new Footer({
            children: [
                new Paragraph({
                text: "Strictly Confidential",
                alignment: AlignmentType.CENTER
                })
            ]
        })
    }

    const doc = new Document({
        sections: [
            {
                headers: {
                    default: displayDateHeader()
                },
                children: [
                    displayTitle("Meeting Title Here"),
                    displaySummary(transcript.summary),
                    displayTitle("Meeting Transcription"),
                    ...displayTranscription(transcript.utterances)
                ],
                footers: {
                    default: displayFooter()
                }
            }
        ]
    })

    return (
        <>
           <button onClick={exportDocument} className="btn m-2 bg-blue-300 font-medium">
                Summarise Meeting
              </button>
        </>
    )

}