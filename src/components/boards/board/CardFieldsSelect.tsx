import {
   DropdownFieldType,
   DropdownFieldItem,
   NumberFieldType,
   TextFieldType,
   FieldType,
} from "@/types"
import React, { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsPlusLg } from "react-icons/bs"
import { useOnClickOutside } from "usehooks-ts"
import SuggestField from "./field/SuggestField"
import FieldSelect from "./field/FieldSelect"
import FieldPreview from "./field/FieldPreview"

type Props = {
   showSelectFields: { show: boolean; tab: string }
   setShowSelectFields: Function
   boardId: string | undefined
   addField: Function
   fields: FieldType[]
}

function CardFieldsSelect(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowSelectFields({ show: false, tab: "" })
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
                  {props.fields?.map((f) => {
                     return <FieldSelect key={f.id} field={f} />
                  })}
               </div>
            </div>
            <button
               onClick={() => {
                  props.setShowSelectFields({ show: true, tab: "addField" })
               }}
               className='w-full text-sm flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 py-2 font-semibold'
            >
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
