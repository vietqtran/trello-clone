import {
   DropdownField,
   DropdownFieldItem,
   NumberField,
   TextField,
} from "@/types"
import React, { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsPlusLg } from "react-icons/bs"
import { useOnClickOutside } from "usehooks-ts"
import SuggestField from "./field/SuggestField"
import FieldSelect from "./field/FieldSelect"
var uniqid = require("uniqid")

const suggestedFields = [
   {
      id: uniqid(),
      boardId: "",
      title: "Priority",
      type: "dropdown",
      options: [
         { id: uniqid(), color: "#ffd2cc", title: "Highest" },
         { id: uniqid(), color: "#ffe2bd", title: "High" },
         { id: uniqid(), color: "#f8e6a0", title: "Medium" },
         { id: uniqid(), color: "#c1f0f5", title: "Low" },
         { id: uniqid(), color: "#cce0ff", title: "Lowest" },
         { id: uniqid(), color: "#f1f2f4", title: "Not sure" },
      ] as DropdownFieldItem[],
   } as DropdownField,
   {
      id: uniqid(),
      boardId: "",
      title: "Status",
      type: "dropdown",
      options: [
         { id: uniqid(), color: "#ffe2bd", title: "Todo" },
         { id: uniqid(), color: "#c1f0f5", title: "In process" },
         { id: uniqid(), color: "#cce0ff", title: "Done" },
         { id: uniqid(), color: "#fdd0ec", title: "In review" },
         { id: uniqid(), color: "#dfd8fd", title: "Approved" },
         { id: uniqid(), color: "#f1f2f4", title: "Not sure" },
      ] as DropdownFieldItem[],
   } as DropdownField,
   {
      id: uniqid(),
      boardId: "",
      title: "Risk",
      type: "dropdown",
      options: [
         { id: uniqid(), color: "#ffd2cc", title: "Highest" },
         { id: uniqid(), color: "#ffe2bd", title: "High" },
         { id: uniqid(), color: "#f8e6a0", title: "Medium" },
         { id: uniqid(), color: "#c1f0f5", title: "Low" },
         { id: uniqid(), color: "#cce0ff", title: "Lowest" },
         { id: uniqid(), color: "#f1f2f4", title: "Not sure" },
      ] as DropdownFieldItem[],
   } as DropdownField,
   {
      id: uniqid(),
      boardId: "",
      title: "Effort",
      value: NaN,
      type: "number",
   } as NumberField,
]

type Props = {
   showSelectFields: boolean
   setShowSelectFields: Function
   boardId: string | undefined
   addField: Function
}

function CardFieldsSelect(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowSelectFields(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)
   return (
      <div
         onClick={handleClickInside}
         ref={ref}
         className='z-10 bg-white right-0 drop-menu-shadow rounded-md p-2 absolute w-[330px]'
      >
         <div className='w-full relative'>
            <h1 className='w-full text-center text-sm font-semibold py-2'>
               Custom Fields
            </h1>
            <div
               onClick={handleClickOutside}
               className='absolute rounded-md right-0 top-0 p-2 text-sm hover:bg-slate-100 cursor-pointer '
            >
               <AiOutlineClose />
            </div>
         </div>
         <div className='px-2 mt-2 pb-5'>
            <div>
               <div className='mb-5'>
                  <FieldSelect
                     field={{
                        id: uniqid(),
                        boardId: "",
                        title: "Effort",
                        type: "number",
                     }}
                  />
               </div>
               <div>
                  <h1 className='text-sm font-medium'>SUGGESTED FIELDS</h1>
                  {suggestedFields.map((f) => {
                     return (
                        <SuggestField
                           addField={props.addField}
                           key={f.id}
                           field={f}
                        />
                     )
                  })}
               </div>
            </div>
            <button className='w-full text-sm flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 py-2 font-semibold'>
               <span className='mr-2'>
                  <BsPlusLg />
               </span>
               <span>New field</span>
            </button>
         </div>
      </div>
   )
}

export default CardFieldsSelect
