import { DropdownFieldType } from "@/types"
import React from "react"

type Props = {
   field: DropdownFieldType
}

function DropdownField(props: Props) {
   return (
      <div
         className='p-1 text-xs mr-3 mt-1 rounded-sm'
         style={{ backgroundColor: props.field.selected.color }}
      >
         {props.field.title}: {props.field.selected.title}
      </div>
   )
}

export default DropdownField
