import React, { memo } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import WorkspaceItem from './WorkspaceItem'

function Workspaces() {
   return (
      <div>
         <div className='relative group flex items-center justify-center text-sm w-fit py-2 px-3 mx-1 cursor-pointer hover:bg-gray-200 rounded-sm'>
            <span className='mr-2'>Workspaces </span>
            <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>
            <div className='absolute hidden group-hover:block bg-white top-[calc(100%+10px)] min-w-[300%] left-0 p-2 drop-menu-shadow rounded-md'>
               <h1 className='p-2 font-semibold text-gray-600 text-xs relative
                before:contents[] before:absolute before:w-full before:h-[30px] before:bg-black before:top-[-30px] before:left-[-10px] before:bg-transparent
               '>Your Workspaces</h1>
               <div>
                  <WorkspaceItem />
                  <WorkspaceItem />
               </div>
            </div>
         </div>
      </div>
   )
}

export default memo(Workspaces)