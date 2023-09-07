import { Board } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

type Props = {
   board: Board | undefined
}

function BoardItem(props: Props) {
   return (
      <div className={`cursor-pointer group relative overflow-hidden rounded-sm lg:col-span-3 md:col-span-4 col-span-6 w-full min-h-[100px]`}>
         <div className='z-20 group flex flex-col justify-between p-2 absolute w-full h-full bg-black bg-opacity-10 group-hover:bg-opacity-40'>
            <h1 className='font-bold text-white block truncate w-full'>{props.board?.title}</h1>
            <div className='flex items-center justify-end text-white'>
               <div className='hidden group-hover:block w-fit rounded-full cursor-pointer z-40'>
                  <span><AiOutlineStar /></span>
               </div>
            </div>
         </div>
         <Image src={`/assets/background/bg-${props.board?.background.type}/bg${props.board?.background.ntn}.jpg`}
            width={400}
            height={400}
            alt='bg'
            className='absolute w-full h-full object-cover z-10'
         />
         <Link href={`/boards/workspaceid/boardid`} className='block w-full h-full absolute top-0 left-0 z-30'></Link>
      </div>
   )
}

export default BoardItem