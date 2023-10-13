import {
   DropdownFieldType,
   DropdownFieldItem,
   NumberFieldType,
   TextFieldType,
   FieldType,
   CheckboxFieldType,
   DateFieldType,
} from "@/types"
import React, { useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsPlusLg } from "react-icons/bs"
import { useOnClickOutside } from "usehooks-ts"
import FieldSelect from "./field/FieldSelect"
import EditDropdownField from "./editField/EditDropdownField"
import EditCheckboxField from "./editField/EditCheckboxField"
import EditDateField from "./editField/EditDateField"
import EditTextField from "./editField/EditTextField"
import EditNumberField from "./editField/EditNumberField"

type Props = {
   showSelectFields: { show: boolean; tab: string }
   setShowSelectFields: Function
   boardId: string | undefined
   addField: Function
   fields: FieldType[]
}

function CardFieldsSelect(props: Props) {
   const [tab, setTab] = useState("")
   const [field, setField] = useState<FieldType>()

   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowSelectFields({ show: false, tab: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)
   return (
      <>
         <div
            onClick={handleClickInside}
            ref={ref}
            className='drop-menu-shadow absolute right-0 z-10 w-[330px] rounded-md bg-white p-2'
         >
            {tab === "" && (
               <>
                  <div className='relative w-full'>
                     <h1 className='w-full py-2 text-center text-sm font-semibold'>
                        Custom Fields
                     </h1>
                     <div
                        onClick={handleClickOutside}
                        className='absolute right-0 top-0 cursor-pointer rounded-md p-2 text-sm hover:bg-slate-100'
                     >
                        <AiOutlineClose />
                     </div>
                  </div>
                  <div className='mt-2 px-2 pb-5'>
                     <div>
                        <div className='mb-5'>
                           {props.fields?.map((f) => {
                              return (
                                 <FieldSelect
                                    setField={setField}
                                    setTab={setTab}
                                    key={f.id}
                                    field={f}
                                 />
                              )
                           })}
                        </div>
                     </div>
                     <button
                        onClick={() => {
                           props.setShowSelectFields({
                              show: true,
                              tab: "addField",
                           })
                        }}
                        className='flex w-full items-center justify-center rounded-md bg-slate-100 py-2 text-sm font-semibold hover:bg-slate-200'
                     >
                        <span className='mr-2'>
                           <BsPlusLg />
                        </span>
                        <span>New field</span>
                     </button>
                  </div>
               </>
            )}
            {tab === "dropdown" && (
               <EditDropdownField
                  setShowSelectFields={props.setShowSelectFields}
                  setTab={setTab}
                  field={field as DropdownFieldType}
               />
            )}
            {tab === "checkbox" && (
               <EditCheckboxField
                  setShowSelectFields={props.setShowSelectFields}
                  setTab={setTab}
                  field={field as CheckboxFieldType}
               />
            )}
            {tab === "date" && (
               <EditDateField
                  setShowSelectFields={props.setShowSelectFields}
                  setTab={setTab}
                  field={field as DateFieldType}
               />
            )}
            {tab === "text" && (
               <EditTextField
                  setShowSelectFields={props.setShowSelectFields}
                  setTab={setTab}
                  field={field as TextFieldType}
               />
            )}
            {tab === "number" && (
               <EditNumberField
                  setShowSelectFields={props.setShowSelectFields}
                  setTab={setTab}
                  field={field as NumberFieldType}
               />
            )}
         </div>
      </>
   )
}

export default CardFieldsSelect
