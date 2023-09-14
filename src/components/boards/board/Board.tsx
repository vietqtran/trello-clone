import React, { useEffect, useState } from 'react'
import BoardLeft from './BoardLeft'
import BoardRight from './BoardRight'
import { Board, WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'

type Props = {
   boardId: string,
   workspaces: WorkspaceType[] | undefined,
   board: Board | undefined
}

function BoardContent(props: Props) {
   const [workspace, setWorkspace] = useState<WorkspaceType>()

   const workspaceId = props.boardId.split('/').at(-2)
   const [showSideBar, setShowSideBar] = useState(true)
   const router = useRouter()


   useEffect(() => {
      const getWorkspace = () => {
         props.workspaces?.forEach((w) => {
            if (w.id === workspaceId) {
               setWorkspace(w)
               return
            }
         })
      }
      getWorkspace()
   })
   console.log(workspace)
   return (
      <div className={`flex min-w-full max-w-full max-h-full min-h-full`}>
         <div className='sidebar text-white min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)] bg-transparent text-inherit bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
            <BoardLeft workspace={workspace} board={props.board} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         </div>
         <div className='flex-1 h-[calc(100vh-55px)]'>
            <BoardRight board={props.board} showSideBar={showSideBar} />
         </div>
      </div>
   )
}

export default BoardContent