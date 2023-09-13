import React, { useEffect, useState } from 'react'
import BoardLeft from './BoardLeft'
import BoardRight from './BoardRight'
import { Board, WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'

type Props = {
   boardId: string,
   workspace: WorkspaceType | undefined
}

function BoardContent(props: Props) {

   const id = props.boardId.split('/').at(-1)
   const [showSideBar, setShowSideBar] = useState(true)
   const [board, setBoard] = useState<Board>()
   const router = useRouter()

   useEffect(() => {
      const getBoard = () => {
         const newBoard = props.workspace?.boards?.find((b) => {
            return b.id === id
         })
         if (!newBoard) {
            // router.push("/boards") 
         }
         setBoard(newBoard)
      }
      getBoard()
   })   
   return (
      <div className={`flex min-w-full max-w-full max-h-full min-h-full`}>
         <div className='sidebar text-white min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)]'>
            <BoardLeft workspace={props.workspace} board={board} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         </div>
         <div className='flex-1 h-[calc(100vh-55px)]'>
            <BoardRight board={board} showSideBar={showSideBar} />
         </div>
      </div>
   )
}

export default BoardContent