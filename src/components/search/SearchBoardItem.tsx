import { Board, WorkspaceType } from '@/types'
import { addRecent } from '@/userMethods'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'
import { AiOutlineStar } from 'react-icons/ai'

type Props = {
   board: Board,
   workspace: string
}

function SearchBoardItem(props: Props) {
   const router = useRouter()
   const handleClick = ()=>{
      addRecent(props.board || { id: '', background: { ntn: 0, type: '' }, columns: [], star: false, title: '', workspaceId: '' })
      router.push(`/boards/${props.workspace}/${props.board.id}`)
   }
   return (
      <div 
         onClick={handleClick}
      className='flex items-start justify-between mt-3 p-1 hover:bg-slate-100 rounded-md cursor-pointer'>
         <div className=' flex items-center justify-start w-full'>
            <Image
            priority
               className='rounded-md block w-full'
               src={`/assets/background/bg-${props.board.background.type}/bg${props.board.background.ntn}.jpg`} width={40} height={40} alt='board-bg' />
         </div>
         <div className='h-full leading-5 ml-3 flex-1'>
            <div className='flex items-center justify-between'>
               <div className='max-w-[200px] md:max-w-[450px] w-auto'>
                  <p className='truncate whitespace-nowrap font-semibold text-sm'>{props.board?.title}</p>
               </div>
            </div>
            <div className='max-w-[200px]'>
               <p className='truncate whitespace-nowrap text-xs'>{props.workspace}</p>
            </div>
         </div>
      </div>
   )
}

export default memo(SearchBoardItem)