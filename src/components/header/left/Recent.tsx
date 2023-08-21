import React from 'react'
import { SlArrowDown } from 'react-icons/sl'

function Recent() {
   return (
      <div className='flex items-center justify-center text-sm w-fit py-2 px-3 mx-1 cursor-pointer hover:bg-gray-200 rounded-sm'>
         <span className='mr-2'>Recent </span>
         <span className='text-xs translate-y-[2px]'><SlArrowDown /></span>
      </div>
   )
}

export default Recent