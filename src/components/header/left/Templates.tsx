import React, { memo } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import TemplateItem from './TemplateItem'
import TemplateSelect from './TemplateSelect'

function Templates() {
   return (
      <>
         <div className='relative flex group/template items-center justify-center text-sm w-fit py-2 px-3 mx-1 cursor-pointer hover:bg-gray-200 rounded-sm'>
            <span className='mr-2'>Templates </span>
            <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>

            <div className='absolute hidden group-hover/template:block bg-white top-[calc(100%+10px)] min-w-[300px] left-0 p-3 drop-menu-shadow rounded-md'>
               <TemplateSelect />
            </div>
         </div>
      </>
   )
}

export default memo(Templates)