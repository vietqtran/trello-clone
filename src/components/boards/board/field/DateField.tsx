import { DateFieldType } from "@/types"
import React, { ChangeEvent, useRef, useState } from "react"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { MdDateRange } from "react-icons/md"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   field: DateFieldType
}

function DateField(props: Props) {
   const now = new Date()
   const currentDate = now.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
   })
   const currentTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
   })

   const [date, setDate] = useState<string>(currentDate)
   const [time, setTime] = useState<string>(currentTime)

   const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value)
   }

   const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTime(event.target.value)
   }

   const [showSelectDate, setShowSelectDate] = useState(false)
   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowSelectDate(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)
   return (
      <div className='text-sm w-full relative rounded-md'>
         <div className='flex items-center justify-start'>
            <span className='mr-2'>
               <MdDateRange />
            </span>
            <span className='text-xs font-medium'>{props.field.title}</span>
         </div>
         <div
            onClick={() => {
               setShowSelectDate(true)
            }}
            className={`w-full bg-slate-100 hover:bg-slate-200 rounded-md overflow-hidden cursor-pointer`}
         >
            <div className='w-full h-full top-0 left-0 bg-transparent hover:bg-slate-200 text-gray-800 flex items-center justify-start p-2 cursor-pointer'>
               <span>
                  <AiOutlinePlus />
               </span>
               <span className='font-semibold'>Add date...</span>
            </div>
         </div>
         {showSelectDate && (
            <div
               onClick={handleClickInside}
               ref={ref}
               className='absolute w-[305px] h-fit top-[calc(100%+10px)] right-0 bg-white drop-menu-shadow z-50 p-2 rounded-md'
            >
               <div className='w-full relative text-center'>
                  <h1 className='text-sm font-semibold py-1'>
                     Edit {props.field.title}
                  </h1>
                  <span
                     onClick={handleClickOutside}
                     className='absolute p-2 top-0 right-0 rounded-md hover:bg-slate-100 cursor-pointer'
                  >
                     <AiOutlineClose />
                  </span>
               </div>
               <div className='grid grid-cols-2 mt-3 gap-4'>
                  <div className='col-span-1'>
                     <div className='text-sm font-semibold'>Date</div>
                     <input
                        onChange={handleDateChange}
                        value={date}
                        type='date'
                        className='block w-full outline-none border-2 border-slate-300 focus:border-blue-500 rounded-sm p-1'
                     />
                  </div>
                  <div className='col-span-1'>
                     <div className='text-sm font-semibold'>Time</div>
                     <input
                        onChange={handleTimeChange}
                        value={time}
                        type='time'
                        className='block w-full outline-none border-2 border-slate-300 focus:border-blue-500 rounded-sm p-1'
                     />
                  </div>
               </div>
               <div className='mt-3 flex items-center justify-between'>
                  <button className='text-sm font-semibold py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md'>
                     Save
                  </button>
                  <button className='text-sm font-semibold py-2 px-3 bg-red-600 hover:bg-red-500 text-white rounded-md'>
                     Remove
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default DateField
