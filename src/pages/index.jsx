import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import Team from '@/components/Team'

export default function Home() {
  return (
    <>
      <Head>
        <title>Minatic</title>
        <meta
          name="description"
          content="Automated text transcription tool for minutes note-taking in meetings."
        />
        <meta name="google-site-verification" content="MJ_yxEc15CNe0xt795x_8pnIOJ8iMdt7urt_vGJ9WrE" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Faqs /> */}
        <Team />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
