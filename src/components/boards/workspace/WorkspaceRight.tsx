import React from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { HiOutlinePencil } from 'react-icons/hi'
import WorkspaceRightTop from './WorkspaceRightTop'
import WorkspaceContent from './WorkspaceContent'
import { WorkspaceType } from '@/types'

type Props = {
   workspace: WorkspaceType | undefined,
   workspaces: WorkspaceType[] | undefined,
   addBoard: Function, 
   changeStar: Function,
   deleteWorkspace: Function
}

function WorkspaceRight(props: Props) {
   return (
      <div className='z-[-1] overflow-y-scroll px-4 pt-0 md:px-8 lg:px-12 min-h-[calc(100vh-55px)]'>
            <WorkspaceRightTop deleteWorkspace={props.deleteWorkspace} workspace={props.workspace} />
         <WorkspaceContent changeStar={props.changeStar} addBoard={props.addBoard} workspaces={props.workspaces} workspace={props.workspace} />
      </div>
   )
}

export default WorkspaceRight