import { FieldType, TextFieldType } from "@/types"
import React from "react"

type Props = {
   field: TextFieldType
}

function TextField(props: Props) {
   return (
      <div className='text-xs pr-2 mt-1'>
         {props.field.title}: {props.field.value}
      </div>
   )
}

export default TextField
