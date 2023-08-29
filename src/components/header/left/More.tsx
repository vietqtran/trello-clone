import React, { useRef, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { useOnClickOutside } from 'usehooks-ts'
import MoreDropdown from './MoreDropdown'

type Props = {
   headerType: string
}

function More(props: Props) {

   const [showDropdown, setShowDropdown] = useState({ show: false, tab: '' })

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowDropdown({ show: false, tab: '' })
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <div
         ref={ref}
         onClick={handleClickInside}
         className={`relative group flex items-center justify-center p-2 text-sm w-fit mx-1 cursor-pointer hover:bg-opacity-20 ${props.headerType === 'board' ? ' hover:bg-white bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0' : 'hover:bg-gray-400'} rounded-sm`}>
         <span className=' py-2 px-3 flex items-center justify-center'
            onClick={() => {
               setShowDropdown({ show: !showDropdown.show, tab: '' })
            }}
         >
            More
            <span className='text-xs translate-y-[2px] ml-2'><SlArrowDown /></span>
         </span>

         {showDropdown.show && <MoreDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} />}
      </div>
   )
}

export default More