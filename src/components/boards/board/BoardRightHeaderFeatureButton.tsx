import React, { ReactNode } from 'react'

type Props = {
   name: string,
   children: ReactNode
}

function BoardRightHeaderFeatureButton(props: Props) {
   return (
      <div className='flex items-center justify-center py-2 px-3 mr-1 bg-white rounded-sm cursor-pointer bg-clip-padding backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 bg-opacity-40'>
         <span>{props.children}</span>
         <span className='text-sm font-light ml-2'>{props.name}</span>
      </div>
   )
}

export default BoardRightHeaderFeatureButton