import React from 'react'
import BoardLeft from './BoardLeft'
import BoardRight from './BoardRight'

type Props = {
   boardId: string
}

function Board(props: Props) {

   const id = props.boardId.split('/').at(-1)

   return (
      <div className={`min-h-[calc(100vh-55px)] flex flex-row items-start justify-start w-[100vw] `}>
         <BoardLeft />
         <div className='flex-1 z-0'>
            <BoardRight />
         </div>
      </div>
   )
}

export default Board