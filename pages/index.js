import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import styles from '../styles/Home.module.css'
//import minaticLogo from "../styles/minatic.png"

import { useSession, signIn, signOut, getSession } from 'next-auth/react';

// server-side rendering
// to pass session with other props data
export async function getServerSideProps(context) {
  
  const session = await getSession(context)
  if (session) {
    return {
        redirect: {
            destination: '/home'
        }
    }
}
return {
    props: { session }
}



}

export default function Index({session}) {
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

        <button className='bg-blue-300 hover:bg-slate-500 hover:text-white py-2 px-4 rounded-full' onClick={() => signIn()}>Sign In</button>

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
