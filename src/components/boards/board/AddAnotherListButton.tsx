import React, { useState, useRef } from "react"
import { BsPlusLg } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   currentLength: string
   handleAddList: Function
}
var uniqid = require("uniqid")

function AddAnotherListButton(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowInput(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   const [showInput, setShowInput] = useState(false)
   const [input, setInput] = useState("")

   return (
      <div
         className='
      bg-black bg-clip-padding backdrop-filter backdrop-blur-sm hover:bg-opacity-70 bg-opacity-40
      rightboard flex flex-col items-start justify-start max-h-[calc(100vh-150px)] mx-2 rounded-md min-w-[271px]'
      >
         {!showInput && (
            <div
               onClick={() => {
                  setShowInput(true)
               }}
               className='text-white w-full cursor-pointer flex items-center justify-start rounded-md hover:bg-slate-700 bg-opacity-30 p-2'
            >
               <span className='mr-3'>
                  <BsPlusLg />
               </span>
               <span>Add another list</span>
            </div>
         )}
         {showInput && (
            <div
               ref={ref}
               onClick={handleClickInside}
               className='p-2 rounded-md w-full'
            >
               <input
                  placeholder='Enter list title...'
                  autoFocus
                  value={input}
                  onChange={(e) => {
                     setInput(e.target.value)
                  }}
                  className='text-black p-2 w-full rounded-sm border-[3px] border-blue-500 outline-none text-sm card-shadow'
               />
               <div className='mt-2 flex items-center justify-start'>
                  <button
                     onClick={() => {
                        if (input != "") {
                           props.handleAddList({
                              id: uniqid(),
                              name: input,
                              cards: [],
                           })
                        }
                        setInput("")
                     }}
                     className='px-3 py-2 rounded-sm text-sm bg-blue-600 hover:bg-blue-700 text-white'
                  >
                     Add list
                  </button>
                  <span
                     onClick={() => {
                        setShowInput(false)
                     }}
                     className='text-white text-xl cursor-pointer hover:bg-slate-700 bg-opacity-70 rounded-sm ml-2 p-2'
                  >
                     <IoMdClose />
                  </span>
               </div>
            </div>
         )}
      </div>
   )
}

export default AddAnotherListButton
