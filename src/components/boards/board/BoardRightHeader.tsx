import React, { useRef, useState } from 'react'
import { AiOutlineStar, AiOutlineUsergroupAdd, AiFillThunderbolt } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { LuTrello } from 'react-icons/lu'
import { BsFilter } from 'react-icons/bs'
import { BiGroup, BiDotsHorizontalRounded, BiRocket } from 'react-icons/bi'
import { useOnClickOutside } from 'usehooks-ts'
import BoardRightHeaderFeature from './BoardRightHeaderFeature'
import BoardRightHeaderFeatureButton from './BoardRightHeaderFeatureButton'

const defaultName = 'name'

function BoardRightHeader() {

   const [showInput, setShowInput] = useState(false)
   const [name, setName] = useState('name')

   const ref = useRef(null)
   const handleClickOutside = () => {
      if (name === '') {
         setName(defaultName)
      }
      setShowInput(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <div className='px-4 py-2 flex flex-wrap items-center justify-between top-0 left-0 right-0 col-span-1 min-h-[60px] max-h-[60px] bg-black text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
         <div className='flex items-center justify-start'>
            <div>
               {showInput && <input
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value)
                  }}
                  ref={ref}
                  onClick={handleClickInside}
                  id='input'
                  defaultValue={'name'}
                  className=' text-white bg-transparent outline-none px-1 text-xl font-bold focus:bg-white 
                     focus:text-black w-fit block rounded-sm focus:border-[3px] focus:border-blue-500 leading-none
                     border-[3px] border-transparent '
                  type="text" name="name"
                  width={20}
                  autoFocus
               />}
               {!showInput &&
                  <h1
                     onClick={() => {
                        setShowInput(!showInput)
                     }}
                     className='cursor-pointer truncate max-w-[350px] text-white font-bold text-xl px-1 border-[3px] border-transparent'>{name}
                  </h1>}
            </div>
            <BoardRightHeaderFeature >
               <AiOutlineStar />
            </BoardRightHeaderFeature>
            <BoardRightHeaderFeature >
               <BiGroup />
            </BoardRightHeaderFeature>
            <BoardRightHeaderFeatureButton name={'Board'}>
               <LuTrello />
            </BoardRightHeaderFeatureButton>
            <BoardRightHeaderFeature >
               <MdKeyboardArrowDown />
            </BoardRightHeaderFeature>
         </div>
         <div className='flex items-center justify-end'>
            <BoardRightHeaderFeature >
               <BiRocket />
            </BoardRightHeaderFeature>
            <BoardRightHeaderFeature >
               <AiFillThunderbolt />
            </BoardRightHeaderFeature>
            <BoardRightHeaderFeature >
               <BiRocket />
            </BoardRightHeaderFeature>
            <BoardRightHeaderFeature >
               <span className='flex items-center justify-center'> <BsFilter /> <span className='ml-2'>Filter</span></span>
            </BoardRightHeaderFeature>
            <span className='font-light mx-2'>|</span>
            <BoardRightHeaderFeatureButton name='Share' >
               <AiOutlineUsergroupAdd />
            </BoardRightHeaderFeatureButton>
            <BoardRightHeaderFeature >
               <BiDotsHorizontalRounded />
            </BoardRightHeaderFeature>
         </div>
      </div>
   )
}

export default BoardRightHeader