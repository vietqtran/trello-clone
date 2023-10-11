import { NumberFieldType } from "@/types"
import React, { ChangeEvent, useState } from "react"
import { MdOutlineNumbers } from "react-icons/md"

type Props = {
   field: NumberFieldType
}

function NumberField(props: Props) {
   const [value, setValue] = useState("")

   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/[^0-9]/g, "")
      setValue(newValue)
   }

   return (
      <div className='text-sm w-full relative rounded-md'>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <MdOutlineNumbers />
            </span>
            <span className='text-xs font-medium'>{props.field.title}</span>
         </div>
         <div
            className={`w-full bg-slate-100 rounded-md overflow-hidden cursor-pointer`}
         >
            <div className='w-full h-full top-0 left-0 bg-transparent text-gray-800 flex items-center justify-start cursor-pointer'>
               <input
                  value={value}
                  onChange={handleInputChange}
                  type='text'
                  placeholder={`Add ${props.field.title}...`}
                  className='rounded-md p-2 py-[6px] text-sm font-semibold border-2 border-slate-100 hover:border-slate-200 outline-none block w-full bg-slate-100 hover:bg-slate-200 focus:border-blue-500 focus:bg-white placeholder:text-gray-800'
               />
            </div>
         </div>
      </div>
   )
}

export default NumberField
