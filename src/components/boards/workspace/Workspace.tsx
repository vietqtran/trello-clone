'use client'

import React, { useState } from 'react'
import WorkspaceLeft from './WorkspaceLeft'
import WorkspaceRight from './WorkspaceRight'
import { WorkspaceType } from '@/types'

type Props = {
   workspace: WorkspaceType | undefined,
   workspaces: WorkspaceType[] | undefined
}

function Workspace(props: Props) {
   const [showSideBar, setShowSideBar] = useState(true)

   return (
      <div className=' text-black flex relative'>
         <div className='sidebar sticky top-[53px] left-0 text-black min-h-full border-r-[1px] border-slate-300 h-[calc(100vh-55px)]'>
            <WorkspaceLeft workspace={props.workspace} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
         </div>
         <div className='w-full'>
            <WorkspaceRight workspaces={props.workspaces} workspace={props.workspace} />
         </div>
      </div>
   )
}

export default Workspace