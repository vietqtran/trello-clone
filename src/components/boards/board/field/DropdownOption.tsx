import { DropdownFieldItem } from "@/types"
import React from "react"
import { RiDeleteBin6Line, RiDraggable } from "react-icons/ri"

type Props = {
   option: DropdownFieldItem
}

function DropdownOption(props: Props) {
   return (
      <div className='flex items-center justify-between w-full py-2'>
         <div className='flex items-center justify-start'>
            <div className='pr-4'>
               <RiDraggable />
            </div>
            <div
               className='mr-4 p-5 cursor-pointer rounded-md'
               style={{ backgroundColor: props.option.color }}
            ></div>
            <div className='text-sm'>{props.option.title}</div>
         </div>
         <div className='p-3'>
            <RiDeleteBin6Line />
         </div>
      </div>
   )
}

export default DropdownOption
