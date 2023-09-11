import { Board, WorkspaceType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

type Props = {
   board: Board | undefined,
   workspace: string | undefined,
   changeStar: Function
}


function BoardItem(props: Props) {
   const router = useRouter()
   const handleClickBoard = () => {
      router.push(`/boards/${props.workspace}/${props.board?.id}`)
   }

   return (
      <div className={`cursor-pointer group relative overflow-hidden rounded-sm lg:col-span-3 md:col-span-4 col-span-6 w-full min-h-[100px]`}>
         <div
            onClick={handleClickBoard}
            className='z-20 group flex flex-col justify-between p-2 absolute w-full h-full bg-black bg-opacity-10 group-hover:bg-opacity-40'>
            <h1 className='font-bold text-white block truncate w-full'>{props.board?.title}</h1>
            <div
               onClick={(e) => {
                  e.stopPropagation()
                  props.changeStar(props.board?.id, props.workspace)
               }}
               className='absolute p-3 bottom-0 right-0 float-right z-50 flex items-center justify-end text-white'>
               <div className={` w-fit rounded-full cursor-pointer z-40`}>
                  {
                     props.board?.star ?
                        <span className='text-yellow-400'><AiTwotoneStar /></span>
                        :
                        <span className='text-yellow-400'><AiOutlineStar /></span>
                  }
               </div>
            </div>
         </div>
         <Image src={`/assets/background/bg-${props.board?.background.type}/bg${props.board?.background.ntn}.jpg`}
            width={400}
            height={400}
            alt='bg'
            className='absolute w-full h-full object-cover z-10'
         />
      </div>
   )
}

export default BoardItem