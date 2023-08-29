import Image from 'next/image'
import React, { memo } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import CardLabels from './CardLabels'

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
      <div className='relative group bg-white hover:bg-slate-100 rounded-md overflow-hidden card-shadow my-2 cursor-pointer'>
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
      </div>
   )
}

export default memo(Card)