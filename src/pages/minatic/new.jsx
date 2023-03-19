import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

export default function New() {
  return (
    <>
      <Head>
        <title>Minatic Demo</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Demo Setup
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Use your recent meetings recording (max 20mins) to try Minatic!
            </p>
          </div>
        </div>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField
            className='col-span-full'
            label="Meeting title"
            id="meeting_title"
            name="meeting_title"
            type="text"
            autoComplete="meeting_title"
            placeHolder="Morning Meeting"
            required
          />
          <TextField
            className="col-span-full"
            label="Upload Meeting Recording (mp3,mp4 files only)"
            id="meeting_file"
            name="meeting_file"
            type="file"
            required
          />
          <SelectField
            className="col-span-full"
            label="Meeting Type"
            id="meeting_type"
            name="meeting_type"
          >
            <option>Check-in Meeting</option>
          </SelectField>
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <div className="col-span-full">
            <Button
              href='/minatic/view'
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Minatic my Meeting <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
