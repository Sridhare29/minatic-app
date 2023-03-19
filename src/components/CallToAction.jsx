import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden py-32"
    >
      {/* <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
          Try out our demo!
          </h2>
          <p className="mt-4 text-lg tracking-tight text-black">
            Automated text transcription tool for minutes note-taking in meetings
          </p>
          <Button href="/register" color="blue" className="mt-10">
            Sign up for demo
          </Button>
        </div>
      </Container>
    </section>
  )
}
