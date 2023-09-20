import React, { ReactNode, memo } from 'react'

type Props = {
   children: ReactNode
}

function BoardRightHeaderFeature(props: Props) {
   return (
      <div className='p-2 mr-1 bg-black rounded-sm cursor-pointer bg-clip-padding backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 bg-opacity-0'>
         {props.children}
      </div>
   )
}

export default memo(BoardRightHeaderFeature)