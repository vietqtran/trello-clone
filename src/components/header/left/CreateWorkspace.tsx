import React from 'react'
import { TfiClose } from 'react-icons/Tfi'
import { SlArrowLeft } from 'react-icons/sl'

type Props = {
   setShow: Function
}

function CreateWorkspace(props: Props) {
   return (
      <div className={`text-black absolute bg-white top-[calc(100%+10px)] min-w-[306px] left-[-20px] p-1 drop-menu-shadow rounded-md`}>
         <div className='flex items-center justify-between text-gray-600'>
            <span className='p-3 rounded-md hover:bg-slate-100' onClick={() => {
               props.setShow({ show: true, tab: '' })
            }}><SlArrowLeft /></span>
            <span className='font-semibold'>Create Workspace</span>
            <span className='p-3 rounded-md hover:bg-slate-100' onClick={() => {
               props.setShow({ show: false, tab: '' })
            }}><TfiClose /></span>
         </div>
      </div>
   )
}

export default CreateWorkspace