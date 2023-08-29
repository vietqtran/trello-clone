import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSettings, MdKeyboardArrowDown } from 'react-icons/md'
import { FaTrello, FaUser } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { ImTable2 } from 'react-icons/im'
import { BsCalendarMinus } from 'react-icons/bs'
import WorkspaceLeftTab from './WorkspaceLeftTab'
import WorkspaceLeftTabFeature from './WorkspaceLeftTabFeature'
import WorkspaceLeftPreviewItem from './WorkspaceLeftPreviewItem'
import { WorkspaceType } from '@/types'

type Props = {
   showSideBar: boolean,
   setShowSideBar: Function,
   workspace: WorkspaceType | undefined
}

function WorkspaceLeft(props: Props) {

   const [tab, setTab] = useState('Boards')

   return (
      <>
         {props.showSideBar &&
            <div className={`bg-white w-[260px] z-20 bg-transparent text-inherit bg-clip-padding backdrop-filter 
               backdrop-blur-sm bg-opacity-10
               sidebar min-h-full overflow-y-scroll 
               ${props.showSideBar ? 'translate-x-0' : 'translate-x-[-260px]'} ease-in duration-200`}>
               <div className=' flex items-center border-b-[1px] p-2 border-slate-300 justify-between w-full'>
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
                           props.setShowSideBar(false)
                        }}
                        className='p-2 rounded-sm cursor-pointer hover:backdrop-blur-md bg-clip-padding backdrop-filter hover:bg-opacity-10 bg-opacity-0 bg-black'>
                        <MdKeyboardArrowLeft />
                     </span>
                  </div>
               </div>
               <div className='my-3 overflow-y-auto'>
                  <WorkspaceLeftTab currentTab={tab} tab='Boards' > <FaTrello /></WorkspaceLeftTab>
                  <WorkspaceLeftTabFeature currentTab={tab} tab='Members' >
                     <FaUser />
                     <BsPlus />
                  </WorkspaceLeftTabFeature>
                  <WorkspaceLeftTabFeature currentTab={tab} tab='Workspace settings' >
                     <MdSettings />
                     <MdKeyboardArrowDown />
                  </WorkspaceLeftTabFeature>
                  <h1 className='text-black font-semibold text-sm px-2 my-2'>Workspace views</h1>
                  <WorkspaceLeftTab currentTab={tab} tab='Table' > <ImTable2 /></WorkspaceLeftTab>
                  <WorkspaceLeftTab currentTab={tab} tab='Calendar' > <BsCalendarMinus /></WorkspaceLeftTab>
                  <h1 className='text-black font-semibold text-sm px-2 my-2'>Your boards</h1>
                  <div className='overflow-y-auto max-h-[40vh]'>
                     {props.workspace?.boards?.map((board) => {
                        return <WorkspaceLeftPreviewItem key={board.id} board={board} />
                     })}
                  </div>
               </div>
            </div>
         }
         {!props.showSideBar &&
            <div className={` z-10 sticky bg-slate-400 bg-opacity-50 bottom-0 left-0 min-h-[calc(100vh-55px)]
               ${props.showSideBar ? 'translate-x-[-260px] min-w-[0px] max-w-[0px]' : 'translate-x-0  min-w-[16px] max-w-[16px]'} ease-in duration-200
            `}>
               <div className='w-full h-full relative'>
                  <span
                     onClick={() => {
                        props.setShowSideBar(true)
                     }}
                     className='z-50 absolute top-[30px] left-[5px] cursor-pointer p-1 bg-slate-500 text-white block w-fit h-fit rounded-full'>
                     <MdKeyboardArrowRight />
                  </span>
               </div>
            </div>
         }
      </>
   )
}

export default WorkspaceLeft