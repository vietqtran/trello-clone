import Image from 'next/image'
import React from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

function StarredItem() {
   return (
      <div className='p-1 hover:bg-slate-100 rounded-md w-full'>
         <div className='flex items-center justify-start w-full'>
            <Image src={'/assets/background/bg-image/bg1.jpg'} alt='image' width={50} height={30} className='rounded-md object-cover mr-2' />
            <div className='block w-[70%]'>
               <p className='leading-none font-semibold truncate whitespace-nowrap'>name</p>
               <p className='leading-none truncate whitespace-nowrap'>worjahkjahkhhhhhd khkjhksdadaasdaskspace</p>
            </div>
            <div className={`p-2 text-base hover:text-lg hover:text-yellow-400 ease-out duration-150`}
            >
               <span className='text-yellow-400'><AiTwotoneStar /></span>
            </div>
         </div>
      </div>
   )
}

export default StarredItem