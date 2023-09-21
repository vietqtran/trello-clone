import { ColumnType } from "@/types"
import React, { useRef } from "react"
import { RiCloseLine } from "react-icons/ri"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   setShowActions: Function
   setShowInput: Function
   handleDeleteList: Function
   column: ColumnType
}

function ColumnOptions(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowActions({ show: false, tab: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   return (
      <div
         ref={ref}
         onClick={handleClickInside}
         className='drop-menu-shadow pt-1 pb-2 absolute left-[calc(100%-40px)] top-[calc(100%+2px)] w-[306px] bg-white z-10 rounded-md'
      >
         <div className='relative mx-1'>
            <h1 className='text-center text-sm font-semibold py-2'>
               List actions
            </h1>
            <span
               onClick={() => {
                  props.setShowActions({ show: false, tab: "" })
               }}
               className='p-2 cursor-pointer absolute right-0 top-0 rounded-md hover:bg-slate-100'
            >
               <RiCloseLine />
            </span>
         </div>
         <ul className='w-full text-sm'>
            <li
               onClick={() => {
                  props.setShowInput(true)
               }}
               className='cursor-pointer w-full hover:bg-slate-200 py-1 px-4'
            >
               Add card...
            </li>
            <li
               onClick={() => {
                  props.setShowActions({ show: true, tab: "copy" })
               }}
               className='cursor-pointer w-full hover:bg-slate-200 py-1 px-4'
            >
               Copy list...
            </li>
            <li className='cursor-pointer w-full hover:bg-slate-200 py-1 px-4'>
               Move list...
            </li>
            <li
               onClick={() => {
                  props.handleDeleteList(props.column.id)
               }}
               className='cursor-pointer w-full hover:bg-slate-200 py-1 px-4'
            >
               Delete list...
            </li>
         </ul>
      </div>
   )
}

export default ColumnOptions
