import React, { useRef, useState } from "react"
import { RiArrowLeftSLine, RiCloseLine } from "react-icons/ri"

import { ColumnType } from "@/types"
import { nanoid } from "nanoid"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   setShowActions: Function
   column: ColumnType
   handleAddList: Function
}

function CopyList(props: Props) {
   const [name, setName] = useState(props.column.name)
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowActions({ show: false, tab: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   const handleAdd = async () => {
      if (name.length === 0 || name === "") {
      } else {
         const newCards = props.column.cards.map((card) => {
            return {
               ...card,
               id: nanoid(),
            }
         })
         await props.handleAddList({
            id: nanoid(),
            name: name,
            cards: newCards,
         })
      }
   }
   return (
      <div
         ref={ref}
         onClick={handleClickInside}
         className='drop-menu-shadow absolute left-[calc(100%-40px)] top-[calc(100%+2px)] z-10 w-[306px] rounded-md bg-white pb-2 pt-1'
      >
         <div className='mx-1 flex items-center justify-between'>
            <span
               onClick={() => {
                  props.setShowActions({ show: true, tab: "" })
               }}
               className='cursor-pointer rounded-md p-2 hover:bg-slate-100'
            >
               <RiArrowLeftSLine />
            </span>
            <h1 className='text-center text-sm font-semibold'>Copy list</h1>
            <span
               onClick={() => {
                  props.setShowActions({ show: false, tab: "" })
               }}
               className='cursor-pointer rounded-md p-2 hover:bg-slate-100'
            >
               <RiCloseLine />
            </span>
         </div>
         <div className='p-2'>
            <h1 className='text-xs font-bold'>Name</h1>
            <textarea
               className='w-full border-2 border-slate-500 p-2'
               autoFocus
               value={name}
               onChange={(e) => {
                  setName(e.target.value)
               }}
            ></textarea>
            <button
               onClick={handleAdd}
               className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
            >
               Create List
            </button>
         </div>
      </div>
   )
}

export default CopyList
