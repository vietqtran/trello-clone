import React, { useEffect, useState } from "react"
import BoardLeft from "./BoardLeft"
import BoardRight from "./BoardRight"
import { Board, WorkspaceType } from "@/types"

type Props = {
   boardId: string
   workspaces: WorkspaceType[]
   board: Board | undefined
   starBoard: Function
   getWorkspaces: Function
   renameBoard: Function
   reSetBoard: Function
   updateColumn: Function
   moveColumn: Function
   workspace: WorkspaceType | undefined
   moveCardBetweenWorkspaces: Function
   moveCardWithinWorkspace: Function
   moveCardWithinBoard: Function
}

function BoardContent(props: Props) {
   const [showSideBar, setShowSideBar] = useState(true)
   return (
      <div className={`flex min-w-full max-w-full max-h-full min-h-full`}>
         <div className='sidebar text-white min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)] bg-transparent text-inherit glassmorphism'>
            <BoardLeft
               workspace={props.workspace}
               board={props.board}
               showSideBar={showSideBar}
               setShowSideBar={setShowSideBar}
            />
         </div>
         <div className='flex-1 h-[calc(100vh-55px)]'>
            <BoardRight
               moveColumn={props.moveColumn}
               updateColumn={props.updateColumn}
               reSetBoard={props.reSetBoard}
               renameBoard={props.renameBoard}
               starBoard={props.starBoard}
               board={props.board}
               showSideBar={showSideBar}
               workspaces={props.workspaces}
               workspace={props.workspace}
               moveCardBetweenWorkspaces={props.moveCardBetweenWorkspaces}
               moveCardWithinWorkspace={props.moveCardWithinWorkspace}
               moveCardWithinBoard={props.moveCardWithinBoard}
            />
         </div>
      </div>
   )
}

export default BoardContent
