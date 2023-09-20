import React, { memo } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import RecentItem from './RecentItem'
import { Board } from '@/types'

type Props = {
   headerType: string,
   recentBoards: Board[]
}

function Recent(props: Props) {
   return (
      <div className={`relative group flex items-center justify-center p-2 text-sm w-fit mx-1 cursor-pointer hover:bg-opacity-20 ${props.headerType === 'board' ? ' hover:bg-white bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0' : 'hover:bg-gray-400'} rounded-sm`}>
         <span className='mr-2'>Recent </span>
         <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>
         <div className=' absolute text-black hidden group-hover:block bg-white top-[calc(100%+10px)] min-w-[300%] left-0 p-3 pr-0 drop-menu-shadow rounded-md'>
            <span className='relative block before:contents[] before:absolute before:w-full before:h-[30px] before:bg-transparent before:top-[-30px] before:left-[-10px]'></span>
            <div className='w-full max-h-[50vh] overflow-y-auto'>
               {props.recentBoards?.length > 0 ? <div>
                  {props.recentBoards.map((board) => {
                     return <RecentItem board={board} key={board.id} />
                  })}
               </div> :
                  <div>No recent board</div>
               }
            </div>
         </div>
      </div>
   )
}

export default memo(Recent)