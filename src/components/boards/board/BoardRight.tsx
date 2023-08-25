import React, { useState } from 'react'
import BoardRightHeader from './BoardRightHeader'

function BoardRight() {
   return (
      <div className='relative w-full'>
         {/* header  */}
         <BoardRightHeader />
         {/* content  */}
         <div>
            content
         </div>
      </div>
   )
}

export default BoardRight