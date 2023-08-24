'use client'

import React, { useState, useRef } from 'react'
import CreateBoard from '../header/left/CreateBoard'
import { useOnClickOutside } from 'usehooks-ts'

function CreateBoardButton() {

   const [show, setShow] = useState({ show: false, tab: '' })

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShow({ show: false, tab: '' })
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <>
         <div
            className={`cursor-pointer group bg-slate-100 hover:bg-slate-200 relative rounded-sm lg:col-span-3 md:col-span-4 col-span-6 w-full min-h-[100px]`}>
            <div
               onClick={() => {
                  setShow({ show: !show.show, tab: '' })
               }}
               className='absolute w-full h-full whitespace-nowrap text-sm top-0 left-0 flex items-center justify-center'>
               Create new board
            </div>
            {show.show && show.tab === '' &&
               <div
                  ref={ref}
                  onClick={handleClickInside}
                  className='z-50 relative'>
                  <CreateBoard setShow={setShow} />
               </div>}
         </div >
      </>
   )
}

export default CreateBoardButton