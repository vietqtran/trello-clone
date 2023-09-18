import Image from 'next/image'
import React from 'react'
import { AiTwotoneStar } from 'react-icons/ai'

function TemplateItem() {
   return (
      <div className='p-1 hover:bg-slate-100 rounded-md w-full'>
         <div className='flex items-center justify-start w-full'>
            <Image src={'/assets/background/bg-image/bg1.jpg'} alt='image' width={50} height={30} className='rounded-md object-cover mr-2' />
            <div className='block w-[80%]'>
               <p className='leading-none font-semibold truncate whitespace-nowrap'>Template name</p>
            </div>
         </div>
      </div>
   )
}

export default TemplateItem