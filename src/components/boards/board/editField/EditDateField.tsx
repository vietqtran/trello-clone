import { DateFieldType } from "@/types"
import React, { useState } from "react"
import { MdClose, MdOutlineArrowBackIosNew } from "react-icons/md"
type Props = {
   setEditTab: Function
   field: DateFieldType | undefined
   renameField: Function
   setShowSelectFields: Function
}
function EditDateField(props: Props) {
   const [title, setTitle] = useState(props.field?.title)

   return (
      <div>
         <div className='flex items-center justify-between'>
            <div
               className='cursor-pointer rounded-sm p-2 text-sm hover:bg-slate-100'
               onClick={() => {
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
               <option value='date'>Date</option>
            </select>

            <div className='pt-4'>
               <button className='text-sm font-semibold text-blue-500 hover:underline'>
                  Delete field
               </button>
            </div>
         </div>
      </div>
   )
}

export default EditDateField
