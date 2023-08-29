import React, { memo } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import TemplateSelect from './TemplateSelect'

type Props = {
   headerType: string
}

function Templates(props: Props) {
   return (
      <>
         <div className={`relative group flex items-center justify-center p-2 text-sm w-fit mx-1 cursor-pointer hover:bg-opacity-20 ${props.headerType === 'board' ? 'bg-white bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0' : 'hover:bg-gray-400'} rounded-sm`}>
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