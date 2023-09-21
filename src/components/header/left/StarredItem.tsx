import { Board, WorkspaceType } from '@/types'
import { addRecent } from '@/userMethods'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { memo, useState } from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

type Props = {
   board: Board,
}

function StarredItem(props: Props) {
   const router = useRouter()
   const handleClick = () => {
      addRecent(props.board || { id: '', background: { ntn: 0, type: '' }, columns: [], star: false, title: '', workspaceId: '' })
      router.push(`/boards/${props.board.workspaceId}/${props.board.id}`)
   }
   return (
      <div
         onClick={handleClick}
         className='p-1 hover:bg-slate-100 rounded-md w-full flex items-center justify-between'>
         <div className='flex items-center justify-start w-full'>
            <div className='w-[50px] h-[40px] mr-2 '>
               <Image priority src={`/assets/background/bg-${props.board.background.type}/bg${props.board.background.ntn}.jpg`} alt='image' width={50} height={50} className='w-full h-full rounded-md object-cover' />
            </div>
            <div className='block w-[70%]'>
               <p className='leading-none font-semibold truncate whitespace-nowrap'>{props.board.title}</p>
            </div>
         </div>
            <div className={`p-2 text-base hover:text-lg hover:text-yellow-400 ease-out duration-150`}
            >
               <span className='text-yellow-400'><AiTwotoneStar /></span>
            </div>
      </div>
   )
}

export default memo(StarredItem)