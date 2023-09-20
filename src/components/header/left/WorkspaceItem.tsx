import { WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'

type Props = {
   workspace: WorkspaceType
}

function WorkspaceItem(props: Props) {
   const router = useRouter()
   return (
      <div
      onClick={()=>{
         router.push(`/boards/${props.workspace.id}`)
      }}
      className='relative flex items-center justify-start p-2 hover:bg-slate-100 rounded-md'>
         <div className='aspect-square w-full flex items-center justify-start max-w-[45px] relative rounded-md bg-gradient-to-r from-sky-500 to-indigo-500'>
            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-semibold'>{props.workspace?.name.toUpperCase().charAt(0)}</span>
         </div>
         <p className='truncate whitespace-nowrap overflow-hidden ml-3 font-semibold text-gray-600'>{props.workspace?.name}</p>
      </div>
   )
}

export default memo(WorkspaceItem)