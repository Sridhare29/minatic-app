import Ziyi from '@/images/avatars/Ziyi.png';
import Pawan from '@/images/avatars/Pawan.png';
import Nirat from '@/images/avatars/Nirat.png';
import Ben from '@/images/avatars/Ben.png';
import Sherry from '@/images/avatars/Sherry.png';
import Image from 'next/image'

const people = [
    {
      name: 'Wang Ziyi',
      role: 'Co-Founder / CEO',
      imageUrl: Ziyi
    },
    {
        name: 'Nirat Singh',
        role: 'Co-Founder / CFO',
        imageUrl:Nirat
      },
      {
        name: 'Pawandeep Singh',
        role: 'Co-Founder / CPO',
        imageUrl: Pawan
      },
      {
        name: 'Sherry Choo',
        role: 'Marketing/Business',
        imageUrl: Sherry
      },
      {
        name: 'Benjamin Goh',
        role: 'Frontend Developer',
        imageUrl: Ben
      },
    // More people...
  ]
  
  export default function Team() {
    return (
      <div className="bg-white py-24 sm:py-32" id='team'>
        <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Team</h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
              Team behind Minatic. 
            </p> */}
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" priority />
                  {/* <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" /> */}
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  