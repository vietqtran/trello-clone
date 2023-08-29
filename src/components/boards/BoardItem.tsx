import Link from 'next/link'
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

function BoardItem() {
   return (
      <div className={`cursor-pointer group relative overflow-hidden bg-[url('/assets/background/bg-image/bg1.jpg')] bg-cover rounded-sm lg:col-span-3 md:col-span-4 col-span-6 w-full min-h-[100px]`}>
         <div className='group flex flex-col justify-between p-2 absolute w-full h-full bg-black bg-opacity-10 group-hover:bg-opacity-40'>
            <h1 className='font-bold text-white block truncate w-full'>aasddassadafsgfgdgshjdg</h1>
            <div className='flex items-center justify-between text-white'>
               <div className='w-[85%]'>
                  <p className='truncate w-full block text-sm'>asjlakjadhakjdndajdsdasdjasn</p>
               </div>
               <div className='hidden group-hover:block w-fit rounded-full cursor-pointer z-20'>
                  <span><AiOutlineStar /></span>
               </div>
            </div>
         </div>
         <Link href={`/boards/workspaceid/boardid`} className='block w-full h-full absolute top-0 left-0 z-10'></Link>
      </div>
   )
}

export default BoardItem