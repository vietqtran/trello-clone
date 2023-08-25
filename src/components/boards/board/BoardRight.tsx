import React, { memo, useState } from 'react'
import BoardRightHeader from './BoardRightHeader'
import Column from './Column'
import AddAnotherListButton from './AddAnotherListButton'

type Props = {
   showSideBar: boolean
}

function BoardRight(props: Props) {
   return (
      <div className='h-full w-full z-10'>
         {/* header  */}
         <BoardRightHeader />
         {/* content  */}
         <div className='w-full h-auto'>
            <div className={`p-2 w-full min-h-[calc(100vh-110px)] overflow-x-auto flex items-start justify-start ${props.showSideBar ? 'max-w-[calc(100vw-260px)]' : 'max-w-[calc(100vw-30px)]'} `}>
               <Column />
               <Column />
               <Column />
               <Column />
               <Column />
               <Column />
               <AddAnotherListButton />
            </div>
         </div>
      </div>
   )
}

export default memo(BoardRight)