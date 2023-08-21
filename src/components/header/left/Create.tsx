import React from 'react'
import { RxPlus } from 'react-icons/rx'

function Create() {
   return (
      <div className='flex items-center justify-center w-fit py-2 px-3 mx-1 cursor-pointer bg-blue-500 text-sm text-white hover:bg-blue-600 rounded-sm'>
         <span className='md:block hidden'>Create</span>
         <span className='md:hidden block'><RxPlus /></span>
      </div>
   )
}

export default Create