import React, { useEffect, useState } from "react"
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"
import { GrClose } from "react-icons/gr"
import WorkspaceItem from "./WorkspaceItem"
import RecentItem from "./RecentItem"
import StarredItem from "./StarredItem"
import TemplateItem from "./TemplateItem"
import { Board, WorkspaceType } from "@/types"

type Props = {
   workspaces: WorkspaceType[]
   starredBoards: Board[]
   recentBoards: Board[]
   showDropdown: { show: boolean; tab: string }
   setShowDropdown: Function
}

function MoreDropdown(props: Props) {
   return (
      <div>
         {props.showDropdown && (
            <div className='bg-white text-black absolute top-[calc(100%+10px)] left-[-80px] drop-menu-shadow rounded-md min-w-[300px]'>
               {props.showDropdown.show && props.showDropdown.tab === "" && (
                  <div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({
                              show: true,
                              tab: "workspace",
                           })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'
                     >
                        <h1>Workspaces</h1>
                        <span>
                           <SlArrowRight />
                        </span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: "recent" })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'
                     >
                        <h1>Recent boards</h1>
                        <span>
                           <SlArrowRight />
                        </span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: "starred" })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'
                     >
                        <h1>Starred boards</h1>
                        <span>
                           <SlArrowRight />
                        </span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({
                              show: true,
                              tab: "template",
                           })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'
                     >
                        <h1>Templates</h1>
                        <span>
                           <SlArrowRight />
                        </span>
                     </div>
                  </div>
               )}
               {props.showDropdown.tab === "workspace" && (
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: "" })
                           }}
                           className='p-3'
                        >
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Workspaces</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: "" })
                           }}
                           className='p-3'
                        >
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {props.workspaces.map((w) => {
                           return <WorkspaceItem key={w.id} workspace={w} />
                        })}
                     </div>
                  </div>
               )}
               {props.showDropdown.tab === "recent" && (
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: "" })
                           }}
                           className='p-3'
                        >
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Recent boards</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: "" })
                           }}
                           className='p-3'
                        >
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {props.recentBoards.map((board) => {
                           return <RecentItem key={board.id} board={board} />
                        })}
                     </div>
                  </div>
               )}
               {props.showDropdown.tab === "starred" && (
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: "" })
                           }}
                           className='p-3'
                        >
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>
                           Starred boards
                        </h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: "" })
                           }}
                           className='p-3'
                        >
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {props.starredBoards.map((board) => {
                           return <StarredItem key={board.id} board={board} />
                        })}
                     </div>
                  </div>
               )}
               {props.showDropdown.tab === "template" && (
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: "" })
                           }}
                           className='p-3'
                        >
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Templates</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: "" })
                           }}
                           className='p-3'
                        >
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'></div>
                  </div>
               )}
            </div>
         )}
      </div>
   )
}

export default MoreDropdown
