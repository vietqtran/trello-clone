"use client"

import React, { useState } from "react"

import WorkspaceLeft from "./WorkspaceLeft"
import WorkspaceRight from "./WorkspaceRight"
import { WorkspaceType } from "@/types"

type Props = {
   workspace: WorkspaceType | null
   workspaces: WorkspaceType[] | undefined
   changeStar: Function
   addBoard: Function
   deleteWorkspace: Function
}

function Workspace(props: Props) {
   const [showSideBar, setShowSideBar] = useState(true)

   return (
      <div className='relative flex text-black'>
         <div className='sidebar sticky left-0 top-[53px] h-[calc(100vh-55px)] min-h-full border-r-[1px] border-slate-300 text-black'>
            <WorkspaceLeft
               changeStar={props.changeStar}
               workspace={props.workspace}
               showSideBar={showSideBar}
               setShowSideBar={setShowSideBar}
            />
         </div>
         <div className='w-full'>
            <WorkspaceRight
               deleteWorkspace={props.deleteWorkspace}
               changeStar={props.changeStar}
               addBoard={props.addBoard}
               workspaces={props.workspaces}
               workspace={props.workspace}
            />
         </div>
      </div>
   )
}

export default Workspace
