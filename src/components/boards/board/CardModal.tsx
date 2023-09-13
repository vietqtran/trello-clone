import { CardType } from '@/types'
import React, { useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineCopy, AiOutlineDelete, AiOutlineMenu } from 'react-icons/ai'
import { FaFlipboard } from 'react-icons/fa'
import { useOnClickOutside } from 'usehooks-ts'
import CardEdit from './CardEdit'
import { MdOutlineLabel } from 'react-icons/md'
import { BiImage } from 'react-icons/bi'
import { FiArrowRight } from 'react-icons/fi'
import CardLabelSelect from './CardLabelSelect'

type Props = {
   setShowModal: Function,
   card: CardType
}

function CardModal(props: Props) {
   const [showInput, setShowInput] = useState(false)
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowModal(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)
   return (
      <>
         <div className='z-40 w-full h-full min-h-[100vh] min-w-[100vw] top-0 left-0 right-0 bottom-0 fixed bg-black bg-opacity-75 flex items-start justify-center'>
            <div
               onClick={handleClickInside}
               ref={ref}
               className='w-full rounded-xl modal p-3 z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white pb-5 max-w-[1000px] overflow-y-auto'
            >

               <div className='flex items-start justify-between'>
                  <div className='flex items-start justify-start'>
                     <div className='p-2 text-xl'>
                        <FaFlipboard />
                     </div>
                     <div className='p-1'>
                        <h2 className='text-lg font-medium'>Name</h2>
                        <span className='text-sm'>in list <span className='underline'>name</span></span>
                     </div>
                  </div>
                  <div
                     onClick={handleClickOutside}
                     className='p-2 rounded-md hover:bg-slate-200 cursor-pointer'>
                     <AiOutlineClose />
                  </div>
               </div>

               <div className='grid grid-cols-5 gap-3 mt-5'>
                  <div className='md:col-span-4 col-span-5'>
                     <div className='w-full flex items-center justify-start'>
                        <div className='p-2 text-lg'>
                           <AiOutlineMenu />
                        </div>
                        <div className='p-1'>
                           <h2 className='text-lg font-medium'>Description</h2>
                        </div>
                     </div>
                     <div className='w-full pl-10'>
                        {!showInput && <div
                           onClick={() => {
                              setShowInput(true)
                           }}
                           className='bg-slate-50 hover:bg-slate-100 cursor-pointer relative w-full h-[70px] rounded-md '>
                           <span className='p-2 absolute top-0 left-0 text-opacity-50 '>Add a more detailed description...</span>
                        </div>}
                        {showInput &&
                           <div className='w-full'>
                              <textarea autoFocus rows={10} className='mb-2  w-full bg-slate-100 outline-none p-2 border-2 border-blue-500'
                                 placeholder={`Pro tip: Hit 'Enter' for a new paragraph, and 'Shift + Enter for a simple line break.`}
                              ></textarea>
                              <div>
                                 <button className='py-2 px-3 bg-blue-500 text-white mr-4 hover:bg-blue-600 rounded-sm text-sm font-medium'>Save</button>
                                 <button
                                    onClick={() => {
                                       setShowInput(false)
                                    }}
                                    className='py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-sm text-sm font-medium'>Cancel</button>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
                  <div className='md:col-span-1 col-span-5'>
                     <div>
                        <span className='text-xs font-medium'>Add to card</span>
                     </div>
                     <div>
                        <div className='relative'>
                           <CardEdit type={'Labels'}>
                              <MdOutlineLabel />
                           </CardEdit>
                           <CardLabelSelect />
                        </div>
                        <div>
                           <CardEdit type={'Cover'}>
                              <BiImage />
                           </CardEdit>
                        </div>
                     </div>
                     <div>
                        <span className='text-xs font-medium'>Actions</span>
                     </div>
                     <div>
                        <div>
                           <CardEdit type={'Move'}>
                              <FiArrowRight />
                           </CardEdit>
                        </div>
                        <div>
                           <CardEdit type={'Copy'}>
                              <AiOutlineCopy />
                           </CardEdit>
                        </div>
                        <div>
                           <CardEdit type={'Delete'}>
                              <AiOutlineDelete />
                           </CardEdit>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CardModal
