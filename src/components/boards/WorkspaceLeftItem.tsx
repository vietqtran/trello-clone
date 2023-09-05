import { WorkspaceType } from '@/types'
import React from 'react'

type Props = {
   workspace: WorkspaceType
}

function WorkspaceLeftItem(props: Props) {
   return (
      <div className='flex items-center justify-start p-2 hover:bg-slate-100 rounded-md cursor-pointer w-full'>
         <div className='mr-2'>
            <div className='p-4 rounded-md bg-black w-fit relative'>
               <span className='text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>{props.workspace.name.toUpperCase().charAt(0)}</span>
            </div>
         </div>
         <div className='w-[70%]'>
            <h1 className='font-semibold text-sm truncate whitespace-nowrap'>{props.workspace.name}</h1>
         </div>
      </div>
   )
}

export default WorkspaceLeftItem