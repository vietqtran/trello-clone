import React from "react"
import TemplateItem from "./TemplateItem"

function TemplateSelect() {
   return (
      <div className=' bg-white  min-w-[300px]'>
         <span
            className='text-xs font-bold text-gray-600 p-1 relative block before:contents[] before:absolute before:w-full before:h-[30px] before:bg-transparent before:top-[-30px] before:left-[-10px]
            '
         >
            Top templates
         </span>
         <div>
            <TemplateItem />
            <TemplateItem />
         </div>
      </div>
   )
}

export default TemplateSelect
