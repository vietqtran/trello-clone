import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function BoardLeft() {

   const [show, setShow] = useState(true)

   return (
      <>
         <div className={` bg-transparent text-white bg-clip-padding backdrop-filter 
      backdrop-blur-sm bg-opacity-10 border-r-[1px] border-slate-400 min-h-[calc(100vh-55px)] ${show ? 'translate-x-0 min-w-[260px] max-w-[260px]' : 'translate-x-[-260px] min-w-[0px] max-w-[0px]'} ease-in duration-200`}>
            {show &&
               <div className='flex items-center border-b-[1px] p-2 border-gray-500 justify-between w-full'>
                  {/* image  */}
                  <div className='relative p-5 bg-black w-fit rounded-md h-fit'>
                     <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-bold '>V</span>
                  </div>
                  {/* text  */}
                  <div>
                     {/* text  */}
                     <div className='w-[150px]'>
                        <p className='truncate whitespace-normal w-full block font-semibold text-sm'> qljhdaddaddasdasdassjkdaskhasdhashah ahdhajashdjahdjklahasjlhasjlhdasljdhlj</p>
                     </div>
                     <span className='text-sm'>
                        Free
                     </span>
                  </div>
                  <div className='h-full flex items-center justify-center'>
                     <span
                        onClick={() => {
                           setShow(false)
                        }}
                        className='p-2 rounded-sm cursor-pointer hover:backdrop-blur-md bg-clip-padding backdrop-filter hover:bg-opacity-10 bg-opacity-0 bg-white'>
                        <MdKeyboardArrowLeft />
                     </span>
                  </div>
               </div>}
         </div>
         {!show &&
            <div className={`sticky bg-slate-800 bottom-0 left-0 min-h-[calc(100vh-55px)]
               ${show ? 'translate-x-[-260px]  min-w-[0px] max-w-[0px]' : 'translate-x-0  min-w-[16px] max-w-[16px]'} ease-in duration-200
            `}>
               <div className='w-full h-full relative'>
                  <span
                     onClick={() => {
                        setShow(true)
                     }}
                     className='absolute top-[30px] left-[5px] cursor-pointer p-1 bg-slate-500 text-white block w-fit h-fit rounded-full'>
                     <MdKeyboardArrowRight />
                  </span>
               </div>
            </div>
         }
      </>
   )
}

export default BoardLeft