import React, { ReactNode } from "react"

type Props = {
   currentTab: string
   tab: string
   children: ReactNode
}

function BoardLeftTab(props: Props) {
   return (
      <div
         className={`text-sm px-5 py-1 cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-sm ${
            props.currentTab === props.tab
               ? "bg-opacity-50 bg-slate-500"
               : "bg-opacity-0 hover:bg-opacity-50 bg-gray-500"
         } `}
      >
         <div className=' flex items-center justify-start'>
            {props.children}
            <span className='ml-2'>{props.tab}</span>
         </div>
      </div>
   )
}

export default BoardLeftTab
