import MinaticLayout from '@/components/dashboard/minaticLayout';
import Link from 'next/link'

import { Button } from '@/components/Button'

export default function MinaticDashboard() {
    return (
        <MinaticLayout>
            <div className='text-center py-12'>
                        <p className='text-xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4'>
                            Welcome to Minatic, Start to upload your meeting or view your meetings
                        </p>
                    </div>

                    <div className='text-center py-12'>
                        <Button href="minatic/new" className="mx-24 my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-36 h-36 rounded-full mx-2">
                            <p>New Meeting</p>
                        </Button>

                        <Button href="minatic/view" className="mx-24 my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-36 h-36 rounded-full mx-2">
                            <p>View Meetings</p>
                        </Button>
                        
                    </div>
        </MinaticLayout>
    )
}


