import { TextFieldType } from "@/types"
import React, { useState } from "react"
import { BiText } from "react-icons/bi"

type Props = {
   field: TextFieldType
}

function TextField(props: Props) {
   const [value, setValue] = useState("")

   return (
      <div className='text-sm w-full relative rounded-md'>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <BiText />
            </span>
            <span className='text-xs font-medium'>{props.field.title}</span>
         </div>
         <div className='w-full bg-slate-100  rounded-md overflow-hidden cursor-pointer'>
            <div className='w-full h-full top-0 left-0 bg-transparent text-gray-800 flex items-center justify-start cursor-pointer'>
               <input
                  value={value}
                  onChange={(e) => {
                     setValue(e.target.value)
                  }}
                  type='text'
                  placeholder={`Add ${props.field.title}...`}
                  className='rounded-md p-2 py-[6px] text-sm font-semibold border-2 border-slate-100 hover:bg-slate-200 hover:border-slate-200 outline-none block w-full bg-slate-100 focus:border-blue-500 focus:bg-white placeholder:text-gray-800'
               />
            </div>
         </div>
      </div>
   )
}

export default TextField
