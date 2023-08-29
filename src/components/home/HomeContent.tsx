'use client'

import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

function HomeContent() {

   const [email, setEmail] = useState('')


   return (
      <div className='mt-[65px] md:mt-0 w-full h-full container mx-auto px-10 md:px-20 grid grid-cols-2 row-auto'>
         <div className='max-w-[600px] md:col-span-1 col-span-2 md:text-left text-center flex items-center justify-center flex-col'>
            <h1 className='md:text-5xl text-2xl text-white font-semibold'>Trello brings all your tasks, teammates, and tools together</h1>
            <p className='md:text-2xl text-xl text-white my-5'>{`Keep everything in the same place-even if your team isn't.`}</p>
            <form action={'/signup'} className='flex items-center justify-start md:flex-row flex-col'>
               <input
                  className='w-[400px] block py-3 px-2 rounded-md outline-none border-2 focus:border-blue-500 border-white bg-white ease-out duration-300'
                  placeholder='Email'
                  onChange={(e) => {
                     setEmail(e.target.value)
                  }}
                  name='email'
                  type='email'
               />
               <div
                  className='mt-4 md:mt-0 ml-0 md:ml-3'><button type='submit' className='md:w-[200px] w-[400px] py-3 rounded-md bg-blue-600 text-white'>{`Sign up - it's free!`}</button></div>
            </form>
         </div >
         <div className='md:col-span-1 col-span-2 h-full flex items-center justify-center'>
            <Image src='/assets/trello-home.webp' width={500} height={500} alt='home' />
         </div>
      </div >
   )
}

export default HomeContent