import { CheckboxFieldType } from "@/types"
import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"

type Props = {
   field: CheckboxFieldType
}

function CheckboxField(props: Props) {
   return (
      <div className='text-xs flex items-center justify-start pr-2 mt-1'>
         <span className='block pr-1'>
            <AiOutlineCheckCircle />
         </span>
         <span className='block'>{props.field.title}</span>
      </div>
   )
}

export default CheckboxField
