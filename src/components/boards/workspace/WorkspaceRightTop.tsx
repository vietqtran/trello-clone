import { WorkspaceType } from '@/types'
import React from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'

type Props = {
   workspace: WorkspaceType | undefined
}

function WorkspaceRightTop(props: Props) {

   return (
      <div className='w-full border-b-2 flex items-center justify-center'>
         <div className='max-w-[855px] w-full'>
            <div className='py-8 flex items-center justify-between'>
               <div className='flex items-center justify-start'>
                  <div className='relative bg-black p-7 rounded-md w-fit mr-3'>
                     <span className='absolute w-full h-full flex items-center justify-center text-2xl top-0 left-0 text-white font-bold'>V</span>
                  </div>
                  <div className='flex items-center justify-start mr-2'>
                     <p className='font-semibold text-lg truncate max-w-[100px] whitespace-normal md:max-w-[300px] leading-5'>{props.workspace?.name}</p>
                     <span className='p-2 text-sm rounded-sm hover:bg-slate-200 ml-2 cursor-pointer'><HiOutlinePencil /></span>
                  </div>
               </div>
               <div>
                  <button className='flex text-sm items-center justify-center text-white bg-blue-500 py-2 px-4 rounded-md whitespace-nowrap'>
                     <span className='mr-2'>
                        <BsPersonAdd />
                     </span>
                     Invite Workspace members
                  </button>
               </div>
            </div>
            <div></div>
         </div>
      </div>
   )
}

export default WorkspaceRightTop