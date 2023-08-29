import React from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'
import WorkspaceRightTop from './WorkspaceRightTop'
import WorkspaceContent from './WorkspaceContent'
import { WorkspaceType } from '@/types'

type Props = {
   workspace: WorkspaceType | undefined
}

function WorkspaceRight(props: Props) {
   return (
      <>
         <div className='z-[-1] overflow-y-scroll px-4 pt-0 md:px-8 lg:px-12'>
            <WorkspaceRightTop workspace={props.workspace} />
            <WorkspaceContent workspace={props.workspace} />
         </div>
      </>
   )
}

export default WorkspaceRight