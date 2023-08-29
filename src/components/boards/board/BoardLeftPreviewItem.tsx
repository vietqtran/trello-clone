import Image from 'next/image'
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

function BoardLeftPreviewItem() {
   return (
      <div className='relative group px-2 flex items-center justify-between w-full text-sm py-[6px] bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-20 rounded-sm cursor-pointer'>
         <div className='flex-1 flex items-center justify-start'>
            <Image src={'/assets/background/bg-image/bg1.jpg'}
               width={30}
               height={30}
               alt='image'
               className='rounded-sm mr-2'
            />
            <p className='block truncate max-w-[170px]'>Board namadsadassaadsdade name</p>
         </div>
         <div className='absolute right-[4px] w-fit items-center justify-center hidden group-hover:flex'>
            <div className='p-1 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-40 rounded-sm cursor-pointer'><AiOutlineStar /></div>
         </div>
      </div>
   )
}

export default BoardLeftPreviewItem