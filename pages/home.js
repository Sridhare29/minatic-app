import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut, getSession } from 'next-auth/react';


// server-side rendering
// to pass session with other props data
export const getServerSideProps = async (context) => {
  const session = await getSession(context)
    if (!session) {
      return {
          redirect: {
              destination: '/'
          }
      }
  }

  return {
    props: { 
      session: session,
    }
}
}

// function displayAuthentication(session) {
//   if(session) {
//   } else {
//     return (
//       <div>
//       <button secondary  onClick={() => signOut()}>Sign In</button>
//       </div>
//     )
//   }
// }

export default function Home({session}) {
  //const {data: session} = useSession()

  return (
    <>
      <Head>
        <title>Minatic</title>
        <meta name="description" content="Building Minatic" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
      <h1 className={styles.title}>
          Welcome {session.user.name}
        </h1>

        <p className={styles.description}>
         <img src={session.user.image} alt="profile pic" />
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


       <button onClick={() => signOut()} className='bg-slate-300 hover:bg-slate-500 hover:text-white py-2 px-4 rounded-full'>Sign out</button>
      </main>
    </>
  )
}