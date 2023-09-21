import { Board, WorkspaceType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
   board: Board | undefined,
   changeStar: Function,
   workspace: string|undefined
}

function WorkspaceLeftPreviewItem(props: Props) {
   return (
      <div className='relative group px-2 flex items-center justify-between w-full text-sm py-[6px] bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-20 rounded-sm cursor-pointer'>
         <div className='flex-1 flex items-center justify-start'>
            <Image src={`/assets/background/bg-${props.board?.background.type}/bg${props.board?.background.ntn}.jpg`}
               width={30}
               height={30}
               alt='image'
               className='rounded-sm mr-2'
               priority
            />
            <p className='block truncate max-w-[170px]'>{props.board?.title}</p>
         </div>
         <div className='absolute right-[4px] w-fit items-center justify-center hidden group-hover:flex'>
            {props.board?.star?
            (<div
               onClick={()=>{
                  props.changeStar(props.board?.id, props.workspace)
               }}
            className='text-yellow-600 p-1 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-40 rounded-sm cursor-pointer'>
               <AiOutlineStar />
            </div>):(<div
               onClick={()=>{
                  props.changeStar(props.board?.id, props.workspace)
               }}
            className='text-yellow-600 p-1 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-40 rounded-sm cursor-pointer'>
               <AiFillStar />
            </div>)   
         }
         </div>
      </div>
   )
}

export default WorkspaceLeftPreviewItem