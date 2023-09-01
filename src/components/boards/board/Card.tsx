import Image from 'next/image'
import React, { memo } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import CardLabels from './CardLabels'
import { MdCopyAll, MdDeleteForever, MdEast, MdLabel, MdOutlineVideoLabel } from 'react-icons/md'

type Props = {
   card: {
      id: string,
      text: string,
      labels: string[],
      image: {
         ntn: number,
         type: string
      }
   }
}

function Card(props: Props) {
   return (
      <div className='relative group bg-white hover:bg-slate-100 rounded-md card-shadow my-1 cursor-pointer'>
         {props?.card?.image.ntn !== 0 && props?.card?.image.type !== '' &&
            <div>
               <Image
                  className='w-full h-[152px] object-cover'
                  src={'/assets/background/bg-image/bg5.jpg'}
                  width={300}
                  height={300}
                  alt='cover'
                  priority
               />
            </div>}
         {props.card.labels && props.card.labels.length > 0 &&
            <CardLabels labels={props.card.labels} />
         }
         <div className='p-2'>
            <p className='text-sm break-words block w-full'>{props.card.text}</p>
            <span className='absolute hidden group-hover:block right-0 top-0 p-[5px] bg-slate-300 bg-opacity-50 hover:bg-opacity-70 rounded-md m-1'>
               <HiOutlinePencil />
            </span>
         </div>

         <div className='absolute top-0 left-[100%] '>
            <div className='flex items-center justify-start w-fit bg-black text-white mb-1 p-2'>
               <span><MdLabel /></span>
               <span>Edit label</span>
            </div>
            <div className='flex items-center justify-start w-fit bg-black text-white mb-1 p-2'>
               <span><MdOutlineVideoLabel /></span>
               <span>Change cover</span>
            </div>
            <div className='flex items-center justify-start w-fit bg-black text-white mb-1 p-2'>
               <span><MdEast /></span>
               <span>Move</span>
            </div>
            <div className='flex items-center justify-start w-fit bg-black text-white mb-1 p-2'>
               <span><MdCopyAll /></span>
               <span>Copy</span>
            </div>
            <div className='flex items-center justify-start w-fit bg-black text-white mb-1 p-2'>
               <span><MdDeleteForever /></span>
               <span>Delete</span>
            </div>
         </div>
      </div>

   )
}

export default memo(Card)