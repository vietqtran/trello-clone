import { WorkspaceType } from "@/types"
import React from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { BsPersonAdd } from "react-icons/bs"
import { HiOutlinePencil } from "react-icons/hi"

type Props = {
   workspace: WorkspaceType | undefined
   deleteWorkspace: Function
}

function WorkspaceRightTop(props: Props) {
   return (
      <div className='w-full border-b-2 flex items-center justify-center'>
         <div className='max-w-[855px] w-full'>
            <div className='py-8 flex items-center justify-between'>
               <div className='flex items-center justify-start'>
                  <div className='relative bg-gradient-to-r from-sky-500 to-indigo-500 p-7 rounded-md w-fit mr-3'>
                     <span className='absolute w-full h-full flex items-center justify-center text-2xl top-0 left-0 text-white font-bold'>
                        {props.workspace?.name.toUpperCase().charAt(0)}
                     </span>
                  </div>
                  <div className='flex items-center justify-start mr-2'>
                     <p className='font-semibold text-lg truncate max-w-[100px] whitespace-normal md:max-w-[300px] leading-5'>
                        {props.workspace?.name}
                     </p>
                  </div>
               </div>
               <div>
                  <button
                     onClick={() => {
                        props.deleteWorkspace()
                     }}
                     className='flex text-sm items-center justify-center text-white bg-red-500 py-2 px-4 rounded-md whitespace-nowrap'
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
