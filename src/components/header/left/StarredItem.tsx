import { Board, WorkspaceType } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

type Props = {
   board: Board,
}

function StarredItem(props: Props) {
   const router = useRouter()
   const handleClick = () => {   
               router.push(`/boards/${props.board.workspaceId}/${props.board.id}`)
   }
   return (
      <div
         onClick={handleClick}
         className='p-1 hover:bg-slate-100 rounded-md w-full'>
         <div className='flex items-center justify-start w-full'>
            <Image src={`/assets/background/bg-${props.board.background.type}/bg${props.board.background.ntn}.jpg`} alt='image' width={50} height={30} className='rounded-md object-cover mr-2' />
            <div className='block w-[70%]'>
               <p className='leading-none font-semibold truncate whitespace-nowrap'>{props.board.title}</p>
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