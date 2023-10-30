import React, { useState } from "react"
import { AiOutlineLock } from "react-icons/ai"
import { BsGlobeAsiaAustralia, BsPeople } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"

function ChangeBoardVisibility() {
   const [visibility, setVisibility] = useState("Workspace")
   const [showVisibility, setShowVisibility] = useState(false)
   return (
      <div className=' text-black z-50 sticky'>
         <div className='relative'>
            <div
               onClick={() => {
                  setShowVisibility(!showVisibility)
               }}
               className='flex items-center justify-between w-full text-sm text-white px-2'
            >
               {visibility === "Private" && (
                  <span className='mr-2'>
                     <AiOutlineLock />
                  </span>
               )}
               {visibility === "Workspace" && (
                  <span className='mr-2'>
                     <BsPeople />
                  </span>
               )}
               {visibility === "Public" && (
                  <span className='mr-2'>
                     <BsGlobeAsiaAustralia />
                  </span>
               )}
               <span>{visibility}</span>
            </div>
            {showVisibility && (
               <div
                  className={`absolute py-2 bg-white drop-menu-shadow text-xs left-0 top-[calc(100%+10px)] rounded-md min-w-[250px] z-50`}
               >
                  <div
                     onClick={() => {
                        setVisibility("Private")
                        setShowVisibility(false)
                     }}
                     className={`w-full flex items-center justify-between py-2 ${
                        visibility === "Private"
                           ? "text-blue-600 bg-blue-100"
                           : ""
                     }`}
                  >
                     <span className='block p-5 text-base'>
                        <AiOutlineLock />
                     </span>
                     <span className='block flex-1'>
                        <span className='text-sm'>Private</span>
                        <br />
                        Only board members can see and edit this board.
                     </span>
                  </div>
                  <div
                     onClick={() => {
                        setVisibility("Workspace")
                        setShowVisibility(false)
                     }}
                     className={`w-full flex items-center justify-between py-2 ${
                        visibility === "Workspace"
                           ? "text-blue-600 bg-blue-100"
                           : ""
                     }`}
                  >
                     <span className='block p-5 text-base'>
                        <BsPeople />
                     </span>
                     <span className='block flex-1'>
                        <span className='text-sm'>Workspace</span>
                        <br />
                        All members of the Project Workspace can see and edit
                        this board.
                     </span>
                  </div>
                  <div
                     onClick={() => {
                        setVisibility("Public")
                        setShowVisibility(false)
                     }}
                     className={`w-full flex items-center justify-between py-2 ${
                        visibility === "Public"
                           ? "text-blue-600 bg-blue-100"
                           : ""
                     }`}
                  >
                     <span className='block p-5 text-base'>
                        <BsGlobeAsiaAustralia />
                     </span>
                     <span className='block flex-1'>
                        <span className='text-sm'>Public</span>
                        <br />
                        Anyone on the internet can see this board. Only board
                        members can edit.
                     </span>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default ChangeBoardVisibility
