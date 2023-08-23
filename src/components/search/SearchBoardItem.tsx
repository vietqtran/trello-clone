import Image from 'next/image'
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

function SearchBoardItem() {
   return (
      <div className='flex items-start justify-between mt-3 p-1 hover:bg-slate-100 rounded-md cursor-pointer'>
         <div className=' flex items-start justify-start'>
            <Image
               className='rounded-md block'
               src={'/assets/background/bg-image/bg1.jpg'} width={40} height={40} alt='board-bg' />
         </div>
         <div className='h-full leading-5 ml-3 flex-1'>
            <div className='flex items-center justify-between'>
               <div className='max-w-[200px] md:max-w-[450px] w-auto'>
                  <p className='truncate whitespace-nowrap font-semibold text-sm'>akhsgakhsdadaahkdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddahadhddhd</p>
               </div>
               <div className='flex items-center justify-end'>
                  <p className='text-xs hidden md:block'>Update a few second ago</p>
                  <div className='p-2'><AiOutlineStar /></div>
               </div>
            </div>
            <div className='max-w-[200px]'>
               <p className='truncate whitespace-nowrap text-xs'>sada,dadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddajdnassakjsandjl</p>
            </div>
         </div>
      </div>
   )
}

export default SearchBoardItem