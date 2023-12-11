import { AiOutlineDelete } from "react-icons/ai"
import { BsPersonAdd } from "react-icons/bs"
import { HiOutlinePencil } from "react-icons/hi"
import React from "react"
import { WorkspaceType } from "@/types"

type Props = {
   workspace: WorkspaceType | null
   deleteWorkspace: Function
}

function WorkspaceRightTop(props: Props) {
   return (
      <div className='flex w-full items-center justify-center border-b-2'>
         <div className='w-full max-w-[855px]'>
            <div className='flex items-center justify-between py-8'>
               <div className='flex items-center justify-start'>
                  <div className='relative mr-3 w-fit rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 p-7'>
                     <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-2xl font-bold text-white'>
                        {props.workspace?.name.toUpperCase().charAt(0)}
                     </span>
                  </div>
                  <div className='mr-2 flex items-center justify-start'>
                     <p className='max-w-[100px] truncate whitespace-normal text-lg font-semibold leading-5 md:max-w-[300px]'>
                        {props.workspace?.name}
                     </p>
                  </div>
               </div>
               <div>
                  <button
                     onClick={() => {
                        props.deleteWorkspace()
                     }}
                     className='flex items-center justify-center whitespace-nowrap rounded-md bg-red-500 px-4 py-2 text-sm text-white'
                  >
                     <span className='mr-2'>
                        <AiOutlineDelete />
                     </span>
                     Delete Workspace
                  </button>
               </div>
            </div>
            <div></div>
         </div>
      </div>
   )
}

export default WorkspaceRightTop
