import React, { useState } from 'react'
import BoardLeft from './BoardLeft'
import BoardRight from './BoardRight'

type Props = {
   boardId: string
}

function Board(props: Props) {

   const id = props.boardId.split('/').at(-1)
   const [showSideBar, setShowSideBar] = useState(true)

   return (
      <div className={`flex min-w-full max-w-full max-h-full min-h-full`}>
         <div className='sidebar text-white min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)]'>
            <BoardLeft showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         </div>
         <div className='flex-1 h-[calc(100vh-55px)]'>
            <BoardRight showSideBar={showSideBar} />
         </div>
      </div>
   )
}

export default Board