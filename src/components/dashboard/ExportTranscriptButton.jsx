import React, { useEffect, useState } from 'react'
import { saveAs } from "file-saver";
import { Header, Packer, Paragraph, TextRun, Document, Footer, AlignmentType, HeadingLevel, LineRuleType } from "docx";
import { Button } from '../Button';

export default function ExportTranscriptButton({title, type, date, transcript, utterances}) {


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
                text: date + ":" + type,
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

    function displayTranscription(){
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
                    displayTitle(title),
                    displaySummary(transcript.summary),
                    displayTitle("Full Transcription"),
                    ...displayTranscription()
                ],
                footers: {
                    default: displayFooter()
                }
            }
        ]
    })
    return (
        <>
           <Button color='blue' onClick={exportDocument} >
                Summarise Meeting in word document
              </Button>
        </>
    )

}