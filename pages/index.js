import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Header from '../components/Header';
import Home from '../components/Home';

import Banner from '../components/Banner';
import FeaturesHome from '../components/Features';
import WaitingList from '../components/WaitingList';

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Head>
        <title>Minatic App</title>
        <meta name="google-site-verification" content="MJ_yxEc15CNe0xt795x_8pnIOJ8iMdt7urt_vGJ9WrE" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Home />

      <FeaturesHome />

      {/* TODO: Link to Hubspot/MailChimp */}
      <WaitingList />

      <footer className={styles.footer}>
        <p className='text-gray-500 no-underline hover:no-underline'>&copy; Minatic 2022</p>
        <span className={styles.logo}>
            <Image src="/minatic.png" alt="Minatic Logo" width={20} height={20} />            
        </span>
    </footer>

    </div>
  )
}
