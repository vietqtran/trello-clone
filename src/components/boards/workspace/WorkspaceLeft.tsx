import { FaTrello, FaUser } from "react-icons/fa"
import {
   MdKeyboardArrowDown,
   MdKeyboardArrowLeft,
   MdKeyboardArrowRight,
   MdSettings,
} from "react-icons/md"
import React, { useState } from "react"

import { BsCalendarMinus } from "react-icons/bs"
import { BsPlus } from "react-icons/bs"
import { ImTable2 } from "react-icons/im"
import WorkspaceLeftPreviewItem from "./WorkspaceLeftPreviewItem"
import WorkspaceLeftTab from "./WorkspaceLeftTab"
import WorkspaceLeftTabFeature from "./WorkspaceLeftTabFeature"
import { WorkspaceType } from "@/types"

type Props = {
   showSideBar: boolean
   setShowSideBar: Function
   workspace: WorkspaceType | null
   changeStar: Function
}

function WorkspaceLeft(props: Props) {
   const [tab, setTab] = useState("Boards")

   return (
      <>
         {props.showSideBar && (
            <div
               className={`bg-white w-[260px] z-20 bg-transparent text-inherit bg-clip-padding backdrop-filter 
               backdrop-blur-sm bg-opacity-10
               sidebar min-h-full overflow-y-scroll 
               ${
                  props.showSideBar ? "translate-x-0" : "translate-x-[-260px]"
               } ease-in duration-200`}
            >
               <div className='flex w-full items-center justify-between border-b-[1px] border-slate-300 p-2'>
                  <div className='relative h-fit w-fit rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 p-5'>
                     <span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white'>
                        {props.workspace?.name.toUpperCase().charAt(0)}
                     </span>
                  </div>
                  <div>
                     <div className='w-[150px]'>
                        <p className='block w-full truncate whitespace-normal text-sm font-semibold'>
                           {props.workspace?.name}
                        </p>
                     </div>
                     <span className='text-sm'>Free</span>
                  </div>
                  <div className='flex h-full items-center justify-center'>
                     <span
                        onClick={() => {
                           props.setShowSideBar(false)
                        }}
                        className='cursor-pointer rounded-sm bg-black bg-opacity-0 bg-clip-padding p-2 backdrop-filter hover:bg-opacity-10 hover:backdrop-blur-md'
                     >
                        <MdKeyboardArrowLeft />
                     </span>
                  </div>
               </div>
               <div className='my-3 overflow-y-auto'>
                  <WorkspaceLeftTab currentTab={tab} tab='Boards'>
                     {" "}
                     <FaTrello />
                  </WorkspaceLeftTab>
                  <WorkspaceLeftTabFeature currentTab={tab} tab='Members'>
                     <FaUser />
                     <BsPlus />
                  </WorkspaceLeftTabFeature>
                  <WorkspaceLeftTabFeature
                     currentTab={tab}
                     tab='Workspace settings'
                  >
                     <MdSettings />
                     <MdKeyboardArrowDown />
                  </WorkspaceLeftTabFeature>
                  <h1 className='my-2 px-2 text-sm font-semibold text-black'>
                     Workspace views
                  </h1>
                  <WorkspaceLeftTab currentTab={tab} tab='Table'>
                     {" "}
                     <ImTable2 />
                  </WorkspaceLeftTab>
                  <WorkspaceLeftTab currentTab={tab} tab='Calendar'>
                     {" "}
                     <BsCalendarMinus />
                  </WorkspaceLeftTab>
                  <h1 className='my-2 px-2 text-sm font-semibold text-black'>
                     Your boards
                  </h1>
                  <div className='max-h-[40vh] overflow-y-auto'>
                     {props.workspace?.boards?.map((board) => {
                        return (
                           <WorkspaceLeftPreviewItem
                              workspace={props.workspace?.id}
                              changeStar={props.changeStar}
                              key={board.id}
                              board={board}
                           />
                        )
                     })}
                  </div>
               </div>
            </div>
         )}
         {!props.showSideBar && (
            <div
               className={` z-10 sticky bg-slate-400 bg-opacity-50 bottom-0 left-0 min-h-[calc(100vh-55px)]
               ${
                  props.showSideBar
                     ? "translate-x-[-260px] min-w-[0px] max-w-[0px]"
                     : "translate-x-0  min-w-[16px] max-w-[16px]"
               } ease-in duration-200
            `}
            >
               <div className='relative h-full w-full'>
                  <span
                     onClick={() => {
                        props.setShowSideBar(true)
                     }}
                     className='absolute left-[5px] top-[30px] z-50 block h-fit w-fit cursor-pointer rounded-full bg-slate-500 p-1 text-white'
                  >
                     <MdKeyboardArrowRight />
                  </span>
               </div>
            </div>
         )}
      </>
   )
}

export default WorkspaceLeft
