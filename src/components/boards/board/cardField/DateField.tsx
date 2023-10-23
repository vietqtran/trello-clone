import { DateFieldType } from "@/types"
import React from "react"

type Props = {
   field: DateFieldType
}

function DateField(props: Props) {
   const formatDate = () => {
      const dateFormat = new Date(props.field.date)
      const monthName = dateFormat.toLocaleString("default", { month: "long" })
      const day = dateFormat.getDate()
      const monthAbbrev = monthName.substring(0, 3)
      const formatted = `${monthAbbrev} ${day}`

      return formatted
   }

   return (
      <div className='text-xs pr-2 mt-1'>
         {props.field.title}: {formatDate()}
      </div>
   )
}

export default DateField
