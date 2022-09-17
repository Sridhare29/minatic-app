import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function start() {
    return (
        <>
        
        <main className={styles.main}>
        <h1 className={styles.title}>
        <a href="#">Start</a> Meeting Page
        </h1>

        <audio controls='controls' />

        <button>Start Recording Meeting</button>
        <button>End Recording Meeting</button>

        <textarea rows="4" cols="50" readonly="true">Transcript below: </textarea>

        <button>Email Transcription</button>

        <button>Save Transcript</button>

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