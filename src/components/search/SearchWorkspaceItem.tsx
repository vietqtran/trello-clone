import { WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'

type Props = {
    workspace: WorkspaceType|undefined
}

function SearchWorkspaceItem(props: Props) {
    
    const router = useRouter()
    
    const handleClick = ()=>{
        router.push(`/boards/${props.workspace?.id}`)
    }
  return (
      <div 
        onClick={handleClick}
      className='flex items-center justify-between mt-3 hover:bg-slate-100 rounded-md cursor-pointer p-2'>
         <div className='bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md p-5 flex items-center justify-start relative'>
        <span className='absolute font-semibold text-xl text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>{props.workspace?.name.toUpperCase().charAt(0)}</span>
         </div>
         <div className='h-full leading-5 ml-3 flex-1'>
            <div className='flex items-center justify-between'>
               <div className='max-w-[200px] md:max-w-[450px] w-auto'>
                  <p className='truncate whitespace-nowrap font-semibold text-sm'>{props.workspace?.name}</p>
               </div>
            </div>
         </div>
      </div>
  )
}

export default memo(SearchWorkspaceItem)
