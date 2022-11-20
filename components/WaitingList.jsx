import React, { useState } from 'react';
import { useRef } from 'react';
import Banner from './Banner';

function WaitingList() {
  const inputRef = useRef(null);

  const [displayBanner, setDisplayBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");


  const subscribeUser = async (e) => {
    e.preventDefault();
    console.log(inputRef.current.value)

    // this is where your mailchimp request is made
    // TODO: Fix calling
    const res = await fetch('/api/subscribeUser', {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),

      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
    }).then(function(data) {
      if(data.status == 201) {
        setDisplayBanner(true)
        setBannerMessage("Thank You! We will get in touch soon.")
      } else {
        setDisplayBanner(true)
        setBannerMessage("You are already in the waiting list. We will get in touch soon.")
      }
    }).catch(function(error) {
      console.log("error" + error)
    });
  };

  // function displayThankYouBanner() {
  //   return (
  //     <Banner
  //       message="Thank You! We will get in touch soon."
  //     />
  //   )
  // }



  return (
    <section id='waitinglist'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="relative bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">

            

            <div className="relative flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="h3 text-white mb-2">Join Our Beta Version</h3>
                <p className="text-gray-300 text-lg mb-6">Join the waitlist for Minatic - Your Minutes Secretary </p>

                {/* CTA form */}
                <form onSubmit={subscribeUser} className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:mx-0">
                    <input  ref={inputRef} type="email" className="form-input w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500" placeholder="Your email…" aria-label="Your email…" required/>
                    <button type='submit' className="btn text-white bg-blue-600 hover:bg-blue-700 shadow" href="#0">Notify&nbsp;Me!</button>
                  </div>
                  {/* Success message */}
                  {/* <p className="text-sm text-gray-400 mt-3">Thanks for subscribing!</p> */}
                  <p className="text-sm text-gray-400 mt-3">No charge at all for beta version</p>
                </form>
              </div>

            </div>

          </div>

        </div>
      </div>

      {displayBanner && <Banner
        message={bannerMessage}
      />}

    </section>
  );
}

export default WaitingList;

