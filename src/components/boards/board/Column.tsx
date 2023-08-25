import React, { useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import Card from './Card'
import { useOnClickOutside } from 'usehooks-ts'

const cards = [
   {
      id: '1',
      text: 'Cart content',
      labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
      image: { ntn: 1, type: 'image' }
   },
   {
      id: '2',
      text: 'Cart content',
      labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
      image: { ntn: 1, type: 'image' }
   },
   {
      id: '3',
      text: 'Cart content',
      labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
      image: { ntn: 1, type: 'image' }
   },
   {
      id: '4',
      text: 'Cart content',
      labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
      image: { ntn: 1, type: 'image' }
   },
   {
      id: '5',
      text: 'Cart content',
      labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
      image: { ntn: 1, type: 'image' }
   }
]

function Column() {

   const [showInput, setShowInput] = useState(false)
   const [input, setInput] = useState('')

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowInput(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <div className='rightboard flex flex-col items-start justify-start max-h-[calc(100vh-150px)] mx-2 pr-0 rounded-md min-w-[271px] bg-slate-100'>
         <div className='p-2 flex items-center justify-between w-full'>
            <h1 className='font-semibold pl-2'>Card name</h1>
            <span className='p-2 hover:bg-slate-300 rounded-md cursor-pointer'><BiDotsHorizontalRounded /></span>
         </div>
         <div className='column w-full overflow-y-auto px-2'>
            {cards.map((card) => {
               return <Card key={card.id} card={card} />
            })}
         </div>
         <div className='p-2 w-full mt-2 cursor-pointer'>
            {!showInput &&
               <div
                  onClick={() => {
                     setShowInput(true)
                  }}
                  className='flex items-center justify-start rounded-md hover:bg-slate-300 p-2'>
                  <span className='mr-3'><BsPlusLg /></span>
                  <span>Add a card</span>
               </div>
            }
            {showInput &&
               <div
                  ref={ref}
                  onClick={handleClickInside}
                  className='p-1 rounded-md w-full'>
                  <textarea placeholder='Enter a title for this card...'
                     autoFocus
                     value={input}
                     onChange={(e) => {
                        setInput(e.target.value)
                     }}
                     className='text-black resize-none h-[70px] p-2 w-full rounded-md outline-none text-sm card-shadow'
                  />
                  <div className='mt-2 flex items-center justify-start'>
                     <button className='px-3 py-2 rounded-sm text-sm bg-blue-600 hover:bg-blue-700 text-white'>Add card</button>
                     <span
                        onClick={() => {
                           setShowInput(false)
                        }}
                        className='text-xl hover:bg-slate-200 rounded-sm ml-2 p-2'><IoMdClose /></span>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default Column