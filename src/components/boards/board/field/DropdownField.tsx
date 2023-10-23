import {
   CardType,
   DropdownFieldItem,
   DropdownFieldType,
   FieldType,
} from "@/types"
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
   const existCard = props.card.fields.find(
      (f) => f?.id === props.field.id
   ) as DropdownFieldType
   const cardField: DropdownFieldType = {
      boardId: "",
      id: "",
      options: existCard ? [...existCard.options] : [],
      selected: existCard
         ? existCard.selected
         : { color: "#f1f2f4", id: "", title: "Status" },
      title: "",
      type: "dropdown",
   }
   const [selectedId, setSelectedId] = useState("")

   const handleSelect = (e: any) => {
      setSelectedId(e.target.value)
      const option = props.field.options.filter(
         (o) => o.id === e.target.value
      )[0]
      props.updateOrAddField(props.columnId, props.card.id, {
         ...props.field,
         selected: option,
      } as DropdownFieldType)
   }

   return (
      <div className='text-sm w-full '>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <RxDropdownMenu />
            </span>
            <span className='text-xs font-medium truncate block w-full'>
               {props.field.title}
            </span>
         </div>
         <div
            style={{ backgroundColor: cardField?.selected?.color }}
            className={`relative w-full ${
               cardField?.selected?.color === "#f1f5f9"
                  ? "hover:bg-slate-200"
                  : ""
            } rounded-md overflow-hidden cursor-pointer`}
         >
            <div
               className={`absolute w-full h-full top-0 left-0 bg-transparent  text-gray-800 flex items-center justify-between px-2 py-1 ${
                  cardField?.selected?.title === "Status" ? "opacity-70" : ""
               }`}
            >
               <span className={`font-semibold `}>
                  {cardField?.selected?.title}
               </span>
               <span>
                  <MdKeyboardArrowDown />
               </span>
            </div>
            <select
               value={selectedId}
               onChange={(e) => {
                  handleSelect(e)
               }}
               className='block w-full bg-slate-50 outline-none p-2 opacity-0'
            >
               <option value={""} disabled>
                  --
               </option>
               {props.field.options.map((o, i) => {
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
