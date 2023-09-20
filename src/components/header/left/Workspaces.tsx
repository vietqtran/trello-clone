import React, { memo, useEffect, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import WorkspaceItem from './WorkspaceItem'
import { User, WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'


type Props = {
   headerType: string,
   workspaces: WorkspaceType[] | undefined
}

function Workspaces(props: Props) {


   return (
      <div>
         <div className={`relative group flex items-center justify-center p-2 text-sm w-fit mx-1 cursor-pointer hover:bg-opacity-20 ${props.headerType === 'board' ? ' hover:bg-white bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0' : 'hover:bg-gray-400'} rounded-sm`}>
            <span className='mr-2'>Workspaces </span>
            <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>
            <div className='absolute hidden group-hover:block bg-white top-[calc(100%+10px)] min-w-[300%] left-0 p-2 drop-menu-shadow rounded-md'>
               <h1 className='p-2 font-semibold text-gray-600 text-xs relative
                before:contents[] before:absolute before:w-full before:h-[30px] before:bg-black before:top-[-30px] before:left-[-10px] before:bg-transparent
               '>Your Workspaces</h1>
               <div className='max-h-[60vh] overflow-y-auto'>
                  {props.workspaces?.map((w) => {
                     return <WorkspaceItem key={w.id} workspace={w} />
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Workspaces