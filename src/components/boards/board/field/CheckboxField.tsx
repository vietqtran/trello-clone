import { CardType, CheckboxFieldType } from "@/types"
import React, { ChangeEventHandler, useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"

type Props = {
   field: CheckboxFieldType
   addField: Function
   card: CardType
   columnId: string
   removeField: Function
}

function CheckboxField(props: Props) {
   const isChecked = !!props.card.fields.find((f) => f?.id === props.field.id)

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const checked = event.target.checked

      if (checked) {
         props.addField(props.columnId, props.card.id, {
            ...props.field,
            isChecked: true,
         } as CheckboxFieldType)
      } else {
         props.removeField(props.columnId, props.card.id, props.field.id)
      }
   }

   return (
      <div className='text-sm w-full'>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <AiOutlineCheckCircle />
            </span>
            <span className='text-xs font-medium truncate block w-full'>
               {props.field.title}
            </span>
         </div>
         <div className={` w-full rounded-md overflow-hidden py-2`}>
            <input
               checked={isChecked}
               type='checkbox'
               onChange={handleCheckboxChange}
            />
         </div>
      </div>
   )
}

export default CheckboxField
