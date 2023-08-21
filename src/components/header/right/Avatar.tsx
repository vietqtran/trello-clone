import React from 'react'

function Avatar() {
   return (
      <div className='p-1 hover:bg-slate-200 rounded-full cursor-pointer ml-1'>
         <div className='p-3 bg-blue-700 rounded-full relative'>
            <span className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white text-xs'>V</span>
         </div>
      </div>
   )
}

export default Avatar