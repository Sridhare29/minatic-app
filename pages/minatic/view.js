import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function view() {
    return (
        <>
        
        <main className={styles.main}>
        <h1 className={styles.title}>
        <a href="#">View</a> Meeting Page
        </h1>

        <div className={styles.grid}>
            <a className={styles.card}>
              <p>Transcription #1 here</p>
              <button>Email Transcript</button>
            </a>

            <a className={styles.card}>
              <p>Transcription #2 here</p>
              <button>Email Transcript</button>
            </a>

            <a className={styles.card}>
              <p>Transcription #3 here</p>
              <button>Email Transcript</button>
            </a>

            <a className={styles.card}>
              <p>Transcription #4 here</p>
              <button>Email Transcript</button>
            </a>
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