import styles from '../../styles/Home.module.css';
import Link from 'next/link';

import {getAllTranscripts} from '../../lib/assemblyai';

import ViewTranscriptCard from '../../components/ViewTranscriptCard';

export async function getServerSideProps() {
  const res = await getAllTranscripts()
  const transcripts = res.data.transcripts
  return { props: { transcripts} }
}

export default function View({transcripts}) {
  function createTranscriptCard(transcript) {
    return (
      <ViewTranscriptCard 
              key = {transcript.id}
              id = {transcript.id}
              created = {transcript.created}
            />
    )
  }

    return (
        <>
        
        
        <main className={styles.main}>
        <h1 className={styles.title}>
        <a href="#">View</a> Meeting Page
        </h1>

        <div className={styles.grid}>
          {transcripts.map(createTranscriptCard)}
           
        </div>

        
        <div className={styles.grid}>

          <Link href="/">
            <a className={styles.card}>
              <p>Back Home</p>
            </a>
          </Link>
        </div>


      </main>


        </>
    )
    
}