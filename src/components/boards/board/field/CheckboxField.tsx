import { CheckboxFieldType } from "@/types"
import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"

type Props = {
   field: CheckboxFieldType
}

function CheckboxField(props: Props) {
   return (
      <div className='text-sm w-full'>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <AiOutlineCheckCircle />
            </span>
            <span className='text-xs font-medium'>{props.field.title}</span>
         </div>
         <div className={` w-full rounded-md overflow-hidden py-2`}>
            <input type='checkbox' />
         </div>
      </div>
   )
}

export default CheckboxField
