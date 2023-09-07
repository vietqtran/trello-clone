import { ColumnType } from '@/types'
import React, { useRef, useState } from 'react'
import { RiArrowLeftSLine, RiCloseLine } from 'react-icons/ri'
import { useOnClickOutside } from 'usehooks-ts'

var uniqid = require('uniqid');

type Props = {
   setShowActions: Function,
   column: ColumnType,
   handleAddList: Function
}

function CopyList(props: Props) {

   const [name, setName] = useState(props.column.name)
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowActions({ show: false, tab: '' })
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   const handleAdd = () => {
      if (name.length === 0 || name === '') {
      } else {
         props.handleAddList({ id: uniqid(), name: name, cards: [...props.column.cards] })
      }
   }
   return (
      <div
         ref={ref}
         onClick={handleClickInside}
         className='drop-menu-shadow pt-1 pb-2 absolute left-[calc(100%-40px)] top-[calc(100%+2px)] w-[306px] bg-white z-10 rounded-md'>
         <div className='mx-1 flex items-center justify-between'>
            <span
               onClick={() => {
                  props.setShowActions({ show: true, tab: '' })
               }}
               className='p-2 cursor-pointer rounded-md hover:bg-slate-100'><RiArrowLeftSLine /></span>
            <h1 className='text-center text-sm font-semibold'>Copy list</h1>
            <span
               onClick={() => {
                  props.setShowActions({ show: false, tab: '' })
               }}
               className='p-2 cursor-pointer rounded-md hover:bg-slate-100'><RiCloseLine /></span>
         </div>
         <div className='p-2'>
            <h1 className='text-xs font-bold'>Name</h1>
            <textarea className='p-2 border-2 w-full border-slate-500' autoFocus
               value={name}
               onChange={(e) => {
                  setName(e.target.value)
               }}
            ></textarea>
            <button
               onClick={handleAdd}
               className='text-sm mt-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white'>Create List</button>
         </div>
      </div>
   )
}

export default CopyList