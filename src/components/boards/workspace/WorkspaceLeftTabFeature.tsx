import React, { ReactNode } from 'react'

type Props = {
   currentTab: string,
   tab: string,
   children: ReactNode[]
}

function WorkspaceLeftTabFeature(props: Props) {
   return (
      <div className={`flex text-sm items-center justify-between px-5 py-1 bg-slate-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-20 `}>
         <div className=' flex items-center justify-start'>
            <span> {props.children[0]}</span>
            <span className='ml-2'>{props.tab}</span>
         </div>
         <div className=' text-lg p-1 bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-20'>
            {props.children[1]}
         </div>
      </div>
   )
}

export default WorkspaceLeftTabFeature