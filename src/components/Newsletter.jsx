/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import Notification from "./dashboard/Notification"

export default function Newsletter() {

  const [isNotified, setIsNotified] = useState(false);
  
  const [header, setHeader] = useState("")
  const [children, setChildren] = useState("")

  const subscribeUser = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    // this is where your mailchimp request is made
    // TODO: Fix calling
    await fetch('/api/newsletter', {
      body: JSON.stringify({
        email: e.target[0].value,
      }),

      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
    }).then(function(data) {
      if(data.status == 201) {
        
        setHeader("Notified")
        setChildren("We will notify you when Minatic is ready.");
        setIsNotified(true);
        

      } else {
        setHeader("Already Notified")
        setChildren("We will notify you when Minatic is ready.");
        setIsNotified(true);
      
      }
    }).catch(function(error) {
      console.log("error" + error)
    });
  };


    return (
      <div id="newsletter" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate flex flex-col gap-10 overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl xl:max-w-none xl:flex-auto">
              Get notified when we’re launching.
            </h2>
            <form className="w-full max-w-md" onSubmit={subscribeUser}>
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Notify me
                </button>
              </div>
              {/* <p className="mt-4 text-sm leading-6 text-gray-300">
                We care about your data. Read our{' '}
                <a href="#" className="font-semibold text-white">
                  privacy&nbsp;policy
                </a>
                .
              </p> */}
            </form>
            { isNotified && <Notification isComplete={true} isNotified={isNotified} setIsNotified={setIsNotified} header={header} >{children}</Notification> }
            <svg
              viewBox="0 0 1024 1024"
              className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    )
  }
  