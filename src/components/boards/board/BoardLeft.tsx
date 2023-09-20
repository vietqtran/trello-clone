import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSettings, MdKeyboardArrowDown } from 'react-icons/md'
import { FaTrello, FaUser } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { ImTable2 } from 'react-icons/im'
import { BsCalendarMinus } from 'react-icons/bs'
import BoardLeftPreviewItem from './BoardLeftPreviewItem'
import BoardLeftTab from './BoardLeftTab'
import BoardLeftTabFeature from './BoardLeftTabFeature'
import { Board, WorkspaceType } from '@/types'

type Props = {
   showSideBar: boolean,
   setShowSideBar: Function,
   board: Board | undefined,
   workspace: WorkspaceType | undefined,
}

function BoardLeft(props: Props) {

   const [tab, setTab] = useState('Boards')
   console.log(props.board)
   return (
      <div>
         {props.showSideBar &&
            <div className={`w-[260px] z-20 
               sidebar min-h-full
               ${props.showSideBar ? 'translate-x-0' : 'translate-x-[-260px]'} ease-in duration-200`}>
               <div className=' flex items-center border-b-[1px] p-2 border-slate-300 justify-between w-full'>
                  <div className='relative p-5 bg-gradient-to-r from-sky-500 to-indigo-500 w-fit rounded-md h-fit'>
                     <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-bold '>{props.board?.title?.toUpperCase().charAt(0)}</span>
                  </div>
                  <div>
                     <div className='w-[150px]'>
                        <p className='truncate whitespace-normal w-full block font-semibold text-sm'>{props.board?.title}</p>
                     </div>
                     <span className='text-sm'>
                        Free
                     </span>
                  </div>
                  <div className='h-full flex items-center justify-center'>
                     <span
                        onClick={() => {
                           props.setShowSideBar(false)
                        }}
                        className='p-2 rounded-sm cursor-pointer hover:backdrop-blur-md bg-clip-padding backdrop-filter hover:bg-opacity-10 bg-opacity-0 bg-white'>
                        <MdKeyboardArrowLeft />
                     </span>
                  </div>
               </div>
               <div className='my-3 overflow-y-auto'>
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
                  <div className='overflow-y-auto max-h-[40vh]'>
                     {props.workspace?.boards?.map((board) => {
                        return <BoardLeftPreviewItem key={board.id} board={board} />
                     })}
                  </div>
               </div>
            </div>
         }
         {!props.showSideBar &&
            <div className={` sticky bg-slate-800 bg-opacity-50 bottom-0 left-0 min-h-[calc(100vh-55px)]
               ${props.showSideBar ? 'translate-x-[-260px] min-w-[0px] max-w-[0px]' : 'translate-x-0  min-w-[16px] max-w-[16px]'} ease-in duration-200
            `}>
               <div className='w-full h-full relative'>
                  <span
                     onClick={() => {
                        props.setShowSideBar(true)
                     }}
                     className='z-50 absolute top-[70px] left-[5px] cursor-pointer p-1 bg-slate-500 text-white block w-fit h-fit rounded-full'>
                     <MdKeyboardArrowRight />
                  </span>
               </div>
            </div>
         }
      </div>
   )
}

export default BoardLeft