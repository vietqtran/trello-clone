import Image from "next/image"
import React from "react"
import { memo } from "react"
import { BsCheck2 } from "react-icons/bs"

type Props = {
   ntn: number
   type: string
   selectBg: { ntn: number; type: string }
   setSelectBg: Function
}

function Background(props: Props) {
   return (
      <div
         className='relative col-span-1 rounded-md overflow-hidden cursor-pointer'
         onClick={() => {
            props.setSelectBg({ ntn: props.ntn, type: props.type })
         }}
      >
         {props.ntn === props.selectBg.ntn &&
            props.type === props.selectBg.type && (
               <div className='absolute w-full h-full bg-opacity-40 bg-black top-0 left-0 text-white flex items-center justify-center'>
                  <BsCheck2 />
               </div>
            )}
         <Image
            src={`/assets/background/bg-${props.type}/bg${props.ntn}.jpg`}
            className='object-cover w-full h-full'
            width={200}
            height={100}
            alt='bg'
            priority
         />
      </div>
   )
}

export default memo(Background)
