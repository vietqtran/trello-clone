import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HomeHeader() {
   return (
      <div className='bg-white pl-2 lg:px-12 h-fit flex items-center justify-between hover:shadow-xl shadow-md ease-in-out duration-200'>
         <Image className='block' src={'/assets/trello-logo-blue.svg'} alt='logo' width={100} height={100} />
         <div className='flex items-center justify-end'>
            <div>
               <Link className='p-5 text-lg block hover:bg-slate-200' href={'/login'}>Log in</Link>
            </div>
            <div>
               <Link className='p-5 text-lg block bg-blue-600 hover:bg-blue-500 text-white' href={'/signup'}>Get Trello for free</Link>
            </div>
         </div>
      </div>
   )
}

export default HomeHeader