import { DropdownFieldItem, DropdownFieldType } from "@/types"
import React, { useRef, useState } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { RiDeleteBin6Line, RiDraggable } from "react-icons/ri"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   option: DropdownFieldItem
   changeTitleOption: Function
   changeBgOption: Function
   deleteOption: Function
   field: DropdownFieldType
}

const colors = [
   "#f1f2f4",
   "#baf3db",
   "#f8e6a0",
   "#fedec8",
   "#ffd5d2",
   "#ffd5d2",
   "#cce0ff",
   "#c6edfb",
   "#d3f1a7",
   "#fdd0ec",
   "#dcdfe4",
]

function DropdownOption(props: Props) {
   const [showChangeBg, setShowChangeBg] = useState(false)
   const [showChangeTitle, setShowChangeTitle] = useState(false)
   const [title, setTitle] = useState(props.option.title)

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowChangeBg(false)
   }
   const handleClickInside = () => {
      setShowChangeBg(true)
   }
   useOnClickOutside(ref, handleClickOutside)
   return (
      <div className='flex items-center justify-between w-full py-2 '>
         <div className='flex items-center justify-start flex-1'>
            <div className='pr-4'>
               <RiDraggable />
            </div>
            <div
               onClick={() => {
                  setShowChangeBg(!showChangeBg)
               }}
               className='mr-1 p-5 cursor-pointer rounded-md relative'
               style={{ backgroundColor: props.option.color }}
            >
               {showChangeBg && (
                  <div
                     ref={ref}
                     onClick={handleClickInside}
                     className='absolute p-1 grid grid-cols-4 rounded-md bg-white z-50 top-[calc(100%+2px)] left-0 drop-shadow-md w-[200px]'
                  >
                     {colors.map((c, i) => {
                        return (
                           <div
                              onClick={() => {
                                 props.changeBgOption(
                                    props.field,
                                    props.option.id,
                                    c
                                 )
                              }}
                              key={i}
                              className={`col-span-1 rounded-md m-1 w-[40px] h-[40px] border-2 relative flex items-center justify-center ${
                                 props.option.color === c
                                    ? "border-blue-500"
                                    : "border-white"
                              }`}
                              style={{ backgroundColor: c }}
                           >
                              {props.option.color === c && (
                                 <span className='leading-none p-0 m-0 block'>
                                    <AiOutlineCheck />
                                 </span>
                              )}
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
            <div className='text-sm flex-1'>
               {showChangeTitle && (
                  <input
                     onBlur={() => {
                        if (title !== "") {
                           props.changeTitleOption(
                              props.field,
                              props.option.id,
                              title
                           )
                        }
                        setShowChangeTitle(false)
                     }}
                     onChange={(e) => {
                        setTitle(e.target.value)
                     }}
                     className='p-2 border-blue-500 border-2 rounded-sm outline-none'
                     autoFocus
                     type='text'
                     value={title}
                  />
               )}
               {!showChangeTitle && (
                  <span
                     onClick={() => {
                        setShowChangeTitle(true)
                     }}
                     className='block w-full border-white border-2 p-2'
                  >
                     {props.option.title}
                  </span>
               )}
            </div>
         </div>
         <div
            onClick={() => {
               props.deleteOption(props.field, props.option.id)
            }}
            className='p-3 text-base hover:text-white hover:bg-red-500 rounded-full'
         >
            <RiDeleteBin6Line />
         </div>
      </div>
   )
}

export default DropdownOption
