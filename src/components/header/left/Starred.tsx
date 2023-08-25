import React, { memo } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import StarredItem from './StarredItem'

function Starred() {
   return (
      <div className={`relative group flex items-center justify-center p-2 text-sm w-fit mx-1 cursor-pointer hover:bg-opacity-20 bg-white bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0 rounded-sm`}>
         <span className='mr-2'>Starred </span>
         <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>

         <div className='absolute text-black hidden group-hover:block bg-white top-[calc(100%+10px)] min-w-[300%] left-0 p-3 drop-menu-shadow rounded-md'>
            <span className='relative block before:contents[] before:absolute before:w-full before:h-[30px] before:bg-transparent before:top-[-30px] before:left-[-10px]
            '></span>
            <div>
               <StarredItem />
               <StarredItem />
            </div>
         </div>
      </div>
   )
}

export default memo(Starred)