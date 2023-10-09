import React from "react"
import { FaFlipboard, FaHashtag } from "react-icons/fa"

type Props = {
   field: any
   addField: Function
}

function SuggestField(props: Props) {
   return (
      <div className='w-full flex items-center justify-between my-2  '>
         <div className='flex items-center justify-start text-xs bg-slate-100  opacity-60 flex-1 p-[10px] mr-2 rounded-sm'>
            <span className='text-gray-800 block mr-2'>
               {props.field.type === "dropdown" && <FaFlipboard />}
               {props.field.type === "number" && <FaHashtag />}
            </span>
            <span>{props.field.title}</span>
         </div>
         <button
            onClick={() => {
               props.addField(props.field)
            }}
            className='h-full py-[10px] px-4 text-xs bg-slate-100 hover:bg-slate-200 font-semibold rounded-sm'
         >
            Add
         </button>
      </div>
   )
}

export default SuggestField
