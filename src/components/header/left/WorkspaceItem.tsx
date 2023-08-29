import React from 'react'

function WorkspaceItem() {
   return (
      <div className='relative flex items-center justify-start p-2 hover:bg-slate-100 rounded-md'>
         <div className='aspect-square w-full flex items-center justify-start max-w-[45px] relative rounded-md bg-black'>
            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-semibold'>E</span>
         </div>
         <p className='truncate whitespace-nowrap overflow-hidden ml-3 font-semibold text-gray-600'>lfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
      </div>
   )
}

export default WorkspaceItem