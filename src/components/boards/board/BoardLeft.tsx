import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSettings, MdKeyboardArrowDown } from 'react-icons/md'
import { FaTrello, FaUser } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { ImTable2 } from 'react-icons/im'
import { BsCalendarMinus } from 'react-icons/bs'
import BoardLeftPreviewItem from './BoardLeftPreviewItem'
import BoardLeftTab from './BoardLeftTab'
import BoardLeftTabFeature from './BoardLeftTabFeature'

function BoardLeft() {

   const [show, setShow] = useState(true)
   const [tab, setTab] = useState('Boards')

   return (
      <>
         {show &&
            <div className={`z-10 bg-transparent text-white bg-clip-padding backdrop-filter 
               backdrop-blur-sm bg-opacity-10 border-r-[1px] border-slate-400 min-h-[calc(100vh-55px)]
               ${show ? 'translate-x-0 min-w-[260px] max-w-[260px]' : 'translate-x-[-260px] min-w-[0px] max-w-[0px]'} ease-in duration-200`}>
               <div className='flex items-center border-b-[1px] p-2 border-gray-500 justify-between w-full'>
                  <div className='relative p-5 bg-black w-fit rounded-md h-fit'>
                     <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-bold '>V</span>
                  </div>
                  <div>
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
               </div>
               <div className='my-3'>
                  <BoardLeftTab currentTab={tab} tab='Boards' > <FaTrello /></BoardLeftTab>
                  <BoardLeftTabFeature currentTab={tab} tab='Members' >
                     <FaUser />
                     <BsPlus />
                  </BoardLeftTabFeature>
                  <BoardLeftTabFeature currentTab={tab} tab='Workspace settings' >
                     <MdSettings />
                     <MdKeyboardArrowDown />
                  </BoardLeftTabFeature>
                  <h1 className='text-white font-semibold text-sm px-2 my-2'>Workspace views</h1>
                  <BoardLeftTab currentTab={tab} tab='Table' > <ImTable2 /></BoardLeftTab>
                  <BoardLeftTab currentTab={tab} tab='Calendar' > <BsCalendarMinus /></BoardLeftTab>
                  <h1 className='text-white font-semibold text-sm px-2 my-2'>Your boards</h1>
                  <div>
                     <BoardLeftPreviewItem />
                     <BoardLeftPreviewItem />
                     <BoardLeftPreviewItem />
                     <BoardLeftPreviewItem />
                     <BoardLeftPreviewItem />
                  </div>
               </div>
            </div>
         }
         {!show &&
            <div className={`z-10 sticky bg-slate-800 bg-opacity-50 bottom-0 left-0 min-h-[calc(100vh-55px)]
               ${show ? 'translate-x-[-260px] min-w-[0px] max-w-[0px]' : 'translate-x-0  min-w-[16px] max-w-[16px]'} ease-in duration-200
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