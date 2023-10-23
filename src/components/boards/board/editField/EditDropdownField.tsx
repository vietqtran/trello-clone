import { DropdownFieldItem, DropdownFieldType, FieldType } from "@/types"
import React, { useEffect, useState } from "react"
import { MdClose, MdOutlineArrowBackIosNew } from "react-icons/md"
import DropdownOption from "./DropdownOption"
import { nanoid } from "nanoid"

type Props = {
   setEditTab: Function
   field: DropdownFieldType | undefined
   setShowSelectFields: Function
   addOption: Function
   renameField: Function
   changeTitleOption: Function
   changeBgOption: Function
   deleteField: Function
   deleteOption: Function
}

function EditDropdownField(props: Props) {
   const [title, setTitle] = useState(props.field?.title)
   const [itemName, setItemName] = useState("")
   const handleAdd = () => {
      var randId = nanoid()
      console.log(randId)
      props.addOption(props.field?.id, {
         id: randId,
         color: "#f1f2f4",
         title: itemName,
      } as DropdownFieldItem)
      setItemName("")
   }
   return (
      <div>
         <div className='flex items-center justify-between'>
            <div
               className='cursor-pointer rounded-sm p-2 text-sm hover:bg-slate-100'
               onClick={() => {
                  console.log("oke")
                  props.setEditTab("")
               }}
            >
               <MdOutlineArrowBackIosNew />
            </div>
            <div className='text-sm font-semibold'>Edit Field</div>
            <div
               className='cursor-pointer rounded-sm p-2 hover:bg-slate-100'
               onClick={() => {
                  props.setShowSelectFields({ show: false, tab: "" })
               }}
            >
               <MdClose />
            </div>
         </div>

         <div className='mt-2 p-2'>
            <label htmlFor='title' className='text-sm font-semibold'>
               Title
            </label>
            <input
               value={title}
               onChange={(e) => {
                  setTitle(e.target.value)
               }}
               onBlur={() => {
                  if (title !== "") {
                     props.renameField(props.field, title)
                  }
               }}
               id='title'
               type='text'
               placeholder='Add a title...'
               className='block w-full rounded-md border-2 border-slate-200 p-2 text-sm outline-none focus:border-blue-500'
            />
            <label htmlFor='type' className='mt-2 block text-sm font-semibold'>
               Type
            </label>
            <select
               disabled
               id='type'
               className='block w-full cursor-not-allowed rounded-md bg-slate-300 p-2 text-sm outline-none'
            >
               <option value='dropdown'>Dropdown</option>
            </select>
            <span className='mt-2 block text-sm font-semibold'>Options</span>
            <div className='mb-2 mt-1 w-full'>
               {props.field?.options.map((o, i) => {
                  return (
                     <DropdownOption
                        deleteOption={props.deleteOption}
                        changeBgOption={props.changeBgOption}
                        changeTitleOption={props.changeTitleOption}
                        option={o}
                        field={props.field as DropdownFieldType}
                        key={i}
                     />
                  )
               })}
            </div>
            <div className='flex w-full items-center justify-between text-sm'>
               <input
                  type='text'
                  className='block w-full flex-1 rounded-sm border-2 border-slate-300 bg-white p-2 outline-none hover:bg-slate-100 focus:border-blue-500 focus:bg-white'
                  value={itemName}
                  placeholder='Add item...'
                  onChange={(e) => {
                     setItemName(e.target.value)
                  }}
               />
               <button
                  onClick={handleAdd}
                  className={`block h-full rounded-sm py-2 px-3 ml-2 font-semibold border-2 ${
                     itemName !== ""
                        ? "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500 text-white"
                        : "bg-slate-200 text-gray-800 border-slate-200"
                  }`}
               >
                  Add
               </button>
            </div>
            <div className='pt-4'>
               <button className='text-sm font-semibold text-blue-500 hover:underline'>
                  Delete field
               </button>
            </div>
         </div>
      </div>
   )
}

export default EditDropdownField
