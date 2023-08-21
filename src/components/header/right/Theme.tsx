import React from 'react'
import { BsCircleHalf } from 'react-icons/bs'

function Theme() {
   return (
      <div className='p-1 hover:bg-slate-200 rounded-full cursor-pointer ml-1'>
         <div className='p-1 rounded-full relative'>
            <BsCircleHalf />
         </div>
      </div>
   )
}

export default Theme