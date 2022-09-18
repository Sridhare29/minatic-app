import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import styles from '../styles/Home.module.css'
//import minaticLogo from "../styles/minatic.png"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Minatic App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Minatic</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Your Minutes Secretary</code>
        </p>

        <div className={styles.grid}>

          <Link href="/minatic/view">
            <a className={styles.card}>
              <h2 className='text-3xl font-bold underline'>View My Minutes</h2>
              <p>View all minutes</p>
            </a>
          </Link>
          
          <Link href="/minatic/start">
            <a className={styles.card}>
              <h2 className='text-3xl font-bold underline'>Start Meeting</h2>
              <p>Start meeting</p>
            </a>
          </Link>
        </div>

        <p>Still under development...</p>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Minatic Team</p>
        <span className={styles.logo}>
            <Image src="/minatic.png" alt="Minatic Logo" width={20} height={20} />
        </span>
      </footer>
    </div>
  )
}

//TODO: Finalise Front-End Simple Design

//TODO: Setup Backend Transcription`
