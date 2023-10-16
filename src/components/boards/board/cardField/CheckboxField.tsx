import { CheckboxFieldType } from "@/types"
import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"

type Props = {
   field: CheckboxFieldType
}

function CheckboxField(props: Props) {
   return (
      <div className='text-xs flex items-center justify-start pr-2'>
         <span className='block'>
            <AiOutlineCheckCircle />
         </span>
         <span className='block'>{props.field.title}</span>
      </div>
   )
}

export default CheckboxField
