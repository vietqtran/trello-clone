import {
   CheckboxFieldType,
   DateFieldType,
   DropdownFieldType,
   NumberFieldType,
   TextFieldType,
} from "@/types"
import React, { useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { SlArrowLeft } from "react-icons/sl"
import { useOnClickOutside } from "usehooks-ts"
var uniqid = require("uniqid")

type Props = {
   showSelectFields: { show: boolean; tab: string }
   setShowSelectFields: Function
   addField: Function
}

function AddField(props: Props) {
   const [title, setTitle] = useState("")
   const [type, setType] = useState("")
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowSelectFields({ show: false, tab: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   const create = () => {
      if (type === "" || title === "") {
      } else {
         switch (type) {
            case "dropdown":
               props.addField({
                  type: type,
                  title: title,
                  options: [],
                  boardId: "",
                  id: uniqid(),
               } as DropdownFieldType)
               break
            case "checkbox":
               props.addField({
                  type: type,
                  title: title,
                  boardId: "",
                  id: uniqid(),
                  isChecked: false,
               } as CheckboxFieldType)
               break
            case "date":
               props.addField({
                  type: type,
                  title: title,
                  boardId: "",
                  id: uniqid(),
                  date: "",
                  time: "",
                  value: "",
               } as DateFieldType)
            case "text":
               props.addField({
                  type: type,
                  title: title,
                  boardId: "",
                  id: uniqid(),
                  value: "",
               } as TextFieldType)
               break
            case "number":
               props.addField({
                  type: type,
                  title: title,
                  boardId: "",
                  id: uniqid(),
                  value: NaN,
               } as NumberFieldType)
               break
            default:
               break
         }
      }
   }
   return (
      <div
         onClick={handleClickInside}
         ref={ref}
         className='z-10 bg-white right-0 drop-menu-shadow rounded-md p-2 absolute w-[330px]'
      >
         <div className='w-full flex items-center justify-between'>
            <div
               onClick={() => {
                  props.setShowSelectFields({ show: true, tab: "" })
               }}
               className=' rounded-md p-2 text-sm hover:bg-slate-100 cursor-pointer '
            >
               <SlArrowLeft />
            </div>
            <h1 className='w-full text-center text-sm font-semibold py-2'>
               New field
            </h1>
            <div
               onClick={handleClickOutside}
               className=' rounded-md p-2 text-sm hover:bg-slate-100 cursor-pointer '
            >
               <AiOutlineClose />
            </div>
         </div>
         <div className='px-2 mt-2 pb-5'>
            <label htmlFor='title' className='text-sm font-semibold'>
               Title
            </label>
            <input
               value={title}
               onChange={(e) => {
                  setTitle(e.target.value)
               }}
               id='title'
               type='text'
               placeholder='Add a title...'
               className='p-2 text-sm border-2 border-slate-200 focus:border-blue-500 block w-full outline-none rounded-md'
            />
            <label htmlFor='type' className='text-sm font-semibold mt-2 block'>
               Type
            </label>
            <select
               value={type}
               onChange={(e) => {
                  setType(e.target.value)
               }}
               name=''
               id='type'
               className='p-2 text-sm border-2 border-slate-200 focus:border-blue-500 block w-full outline-none rounded-md'
            >
               <option value='' disabled>
                  Select...
               </option>
               <option value='checkbox'>Checkbox</option>
               <option value='dropdown'>Dropdown</option>
               <option value='date'>Date</option>
               <option value='number'>Number</option>
               <option value='text'>Text</option>
            </select>
            <button
               onClick={create}
               className={`text-center w-full py-2 text-white  rounded-md mt-3 ${
                  title !== "" && type !== "" ? "bg-blue-500" : "bg-slate-200"
               } text-sm font-semibold`}
            >
               Create
            </button>
         </div>
      </div>
   )
}

export default AddField
