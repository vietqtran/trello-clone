'use client'

import Image from 'next/image'
import React, { memo } from 'react'
import { Board } from '@/types'
import { useRouter } from 'next/navigation'

type Props = {
   board: Board
}

function RecentItem(props: Props) {
   const router = useRouter()
   return (
      <div 
         onClick={()=>{
            router.push(`/boards/${props.board.workspaceId}/${props.board.id}`)
         }}
      className='p-1 hover:bg-slate-100 rounded-md w-full flex items-center justify-between'>
         <div className='flex items-center justify-start w-full'>
            <div className='w-[50px] h-[40px] mr-2 '>
               <Image priority src={`/assets/background/bg-${props.board.background.type}/bg${props.board.background.ntn}.jpg`} alt='image' width={50} height={50} className='w-full h-full rounded-md object-cover' />
            </div>
            <div className='block w-[70%]'>
               <p className='leading-none font-semibold truncate whitespace-nowrap'>{props.board.title}</p>
            </div>
         </div>
      </div>
   )
}

export default memo(RecentItem)