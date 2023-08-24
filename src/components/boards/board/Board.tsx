import React from 'react'
import BoardLeft from './BoardLeft'
import BoardRight from './BoardRight'

type Props = {
   boardId: string
}

function Board(props: Props) {

   const id = props.boardId.split('/').at(-1)

   return (
      <div className={`min-h-[calc(100vh-55px)] flex`}>
         <BoardLeft />
         <BoardRight />
      </div>
   )
}

export default Board