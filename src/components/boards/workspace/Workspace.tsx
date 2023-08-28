'use client'

import React, { useState } from 'react'
import BoardLeft from '../board/BoardLeft'
import WorkspaceLeft from './WorkspaceLeft'
import WorkspaceRight from './WorkspaceRight'

function Workspace() {

   const [showSideBar, setShowSideBar] = useState(true)

   return (
      <div className=' text-black flex relative'>
         <div className='sidebar sticky top-[53px] left-0 text-black min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)]'>
            <WorkspaceLeft showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         </div>
         <div className='w-full'>
            <WorkspaceRight />
         </div>
      </div>
   )
}

export default Workspace