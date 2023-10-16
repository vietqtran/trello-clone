import { CardType, DropdownFieldType, FieldType } from "@/types"
import React, { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { RxDropdownMenu } from "react-icons/rx"

type Props = {
   field: DropdownFieldType
   addField: Function
   card: CardType
   columnId: string
   removeField: Function
   updateOrAddField: Function
}

function DropdownField(props: Props) {
   const cardField = props.card.fields.find(
      (f) => f.id === props.field.id
   ) as DropdownFieldType

   const [bg, setBg] = useState(cardField?.selected?.color || "bg-slate-100")
   const [title, setTitle] = useState(cardField?.selected?.title || "Status")

   const handleSelect = (e: any) => {
      const option = props.field.options.filter((o) => (o.id = e.target.value))
      console.log(option)
   }

   return (
      <div className='text-sm w-full '>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <RxDropdownMenu />
            </span>
            <span className='text-xs font-medium'>{props.field.title}</span>
         </div>
         <div
            className={`relative w-full ${bg} ${
               bg === "bg-slate-100" ? "hover:bg-slate-200" : ""
            } rounded-md overflow-hidden cursor-pointer`}
         >
            <div className='absolute w-full h-full top-0 left-0 bg-transparent  text-gray-800 flex items-center justify-between px-2 py-1'>
               <span className='font-semibold'>{title}</span>
               <span>
                  <MdKeyboardArrowDown />
               </span>
            </div>
            <select
               onChange={(e) => {
                  handleSelect(e)
               }}
               className='block w-full bg-slate-50 outline-none p-2 opacity-0'
            >
               <option selected disabled>
                  --
               </option>
               {props.field.options.map((o) => {
                  return (
                     <option key={o.id} value={o.id}>
                        {o.title}
                     </option>
                  )
               })}
            </select>
         </div>
      </div>
   )
}

export default DropdownField
