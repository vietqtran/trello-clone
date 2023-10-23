import { FieldType, NumberFieldType } from "@/types"
import React from "react"

type Props = {
   field: NumberFieldType
}

function NumberField(props: Props) {
   return (
      <div className='text-xs pr-2 mt-1'>
         {props.field.title}: {props.field.value.toLocaleString()}
      </div>
   )
}

export default NumberField
