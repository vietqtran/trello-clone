import { BsPersonAdd } from "react-icons/bs"
import { HiOutlinePencil } from "react-icons/hi"
import React from "react"
import WorkspaceContent from "./WorkspaceContent"
import WorkspaceRightTop from "./WorkspaceRightTop"
import { WorkspaceType } from "@/types"

type Props = {
   workspace: WorkspaceType | null
   workspaces: WorkspaceType[] | undefined
   addBoard: Function
   changeStar: Function
   deleteWorkspace: Function
}

function WorkspaceRight(props: Props) {
   return (
      <div className='z-[-1] min-h-[calc(100vh-55px)] overflow-y-scroll px-4 pt-0 md:px-8 lg:px-12'>
         <WorkspaceRightTop
            deleteWorkspace={props.deleteWorkspace}
            workspace={props.workspace}
         />
         <WorkspaceContent
            changeStar={props.changeStar}
            addBoard={props.addBoard}
            workspaces={props.workspaces}
            workspace={props.workspace}
         />
      </div>
   )
}

export default WorkspaceRight
