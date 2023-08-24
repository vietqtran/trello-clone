import React from 'react'

type Props = {
   boardId: string
}

function Board(props: Props) {

   const id = props.boardId.split('/').at(-1)

   return (
      <div className={`bg-[url('/assets/background/bg-image/bg3.jpg')] bg-center bg-cover min-h-[100vh] max-h-[100vh] `}>

      </div>
   )
}

export default Board