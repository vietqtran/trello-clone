import React from 'react'
import { SlArrowLeft } from 'react-icons/sl'
import { TfiClose } from 'react-icons/Tfi'
import Templates from './Templates'
import TemplateSelect from './TemplateSelect'

type Props = {
   setShow: Function
}

function CreateTemplate(props: Props) {
   return (
      <div className={`text-black absolute bg-white top-[calc(100%+10px)] min-w-[306px] left-[-20px] p-1 drop-menu-shadow rounded-md`}>
         <div className='flex items-center justify-between text-gray-600'>
            <span className='p-3 rounded-md hover:bg-slate-100' onClick={() => {
               props.setShow({ show: true, tab: '' })
            }}><SlArrowLeft /></span>
            <span className='font-semibold'>Create from template</span>
            <span className='p-3 rounded-md hover:bg-slate-100' onClick={() => {
               props.setShow({ show: false, tab: '' })
            }}><TfiClose /></span>
         </div>
         <div className='p-2'>
            <TemplateSelect />
         </div>
      </div>
   )
}

export default CreateTemplate