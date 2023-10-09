import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FaFlipboard, FaHashtag } from "react-icons/fa"
import { MdDateRange, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { PiTextTBold } from "react-icons/pi"
import { RiDraggable } from "react-icons/ri"
import { SlArrowRight } from "react-icons/sl"

type Props = {
   field: any
}
function FieldSelect(props: Props) {
   return (
      <div className='flex items-center justify-between text-xs bg-slate-100 hover:bg-slate-200 p-[10px] rounded-sm cursor-pointer'>
         <div className='flex items-center justify-start text-xs'>
            <span className='text-sm'>
               <RiDraggable />
            </span>
            <span className='text-gray-800 block ml-5 mr-2'>
               {props.field.type === "dropdown" && <FaFlipboard />}
               {props.field.type === "number" && <FaHashtag />}
               {props.field.type === "checkbox" && <AiOutlineCheckCircle />}
               {props.field.type === "text" && <PiTextTBold />}
               {props.field.type === "date" && <MdDateRange />}
            </span>
            <span>{props.field.title}</span>
         </div>
         <div>
            <SlArrowRight />
         </div>
      </div>
   )
}

export default FieldSelect
