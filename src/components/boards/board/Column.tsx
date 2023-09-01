import React, { useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import Card from './Card'
import { useOnClickOutside } from 'usehooks-ts'
import ColumnOptions from './ColumnOptions'
import { CardType, ColumnType } from '@/types'
import CopyList from './CopyList'
import { Container, Draggable } from 'react-smooth-dnd'

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

type Card = {
   id: string,
   text: string,
   labels: string[],
   image: {
      ntn: number,
      type: string
   }
}

type Props = {
   column: {
      id: string,
      name: string,
      cards: CardType[]
   },
   handleAddCard: (columnId: string, card: CardType) => void,
   setColumns: Function,
   columns: ColumnType[],
   handleAddList: (list: ColumnType) => void
}

function Column(props: Props) {

   const [showInput, setShowInput] = useState(false)
   const [input, setInput] = useState('')
   const [showActions, setShowActions] = useState({ show: false, tab: '' })

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowInput(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)
   const onCardDrop = (id: string, index: number) => { }
   const getCardPayload = (id: string, index: number) => { }
   return (
      <div className='rightboard relative flex flex-col items-start justify-start max-h-[calc(100vh-150px)] mx-2 pr-0 rounded-md min-w-[271px] bg-slate-100'>
         <div className='column-drag-handle cursor-pointer relative p-2 flex items-center justify-between w-full'>
            <h1 className='font-semibold pl-2'>{props.column.name}</h1>
            <div
               onClick={() => {
                  setShowActions({ show: true, tab: '' })
               }}
               className=' p-2 hover:bg-slate-300 rounded-md cursor-pointer'>
               <BiDotsHorizontalRounded />
            </div>
            {showActions.show && showActions.tab === '' && <ColumnOptions setShowActions={setShowActions} setShowInput={setShowInput} />}
            {showActions.show && showActions.tab === 'copy' && <CopyList handleAddList={props.handleAddList} column={props.column} setShowActions={setShowActions} />}
         </div>
         <div className='column w-full overflow-y-auto overflow-x-visible px-2'>
            <Container
               groupName="col"
               onDragStart={(e: any) => console.log("drag started", e)}
               onDragEnd={(e: any) => console.log("drag end", e)}
               onDrop={(e: any) => onCardDrop(props.column.id, e)}
               getChildPayload={(index: number) =>
                  getCardPayload(props.column.id, index)
               }
               dragClass="card-ghost"
               dropClass="card-ghost-drop"
               onDragEnter={() => {
                  console.log("drag enter:", props.column.id);
               }}
               onDragLeave={() => {
                  console.log("drag leave:", props.column.id);
               }}
               onDropReady={(p: any) => console.log('Drop ready: ', p)}
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'drop-preview'
               }}
               dropPlaceholderAnimationDuration={200}
            >
               {props.column.cards.map((card) => {
                  return (
                     <Draggable key={card.id + props.column.id} >
                        <Card card={card} />
                     </Draggable>
                  )
               })}
            </Container>
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
                     className='text-black resize-none h-[70px] p-2 w-full rounded-md outline-none text-sm card-shadow border-blue-500 border-[3px]'
                  />
                  <div className='mt-2 flex items-center justify-start'>
                     <button
                        onClick={() => {
                           if (input.length > 0) {
                              props.handleAddCard(props.column.id, {
                                 id: (props.column.cards.length + 1) + '',
                                 text: input,
                                 labels: [],
                                 image: {
                                    ntn: 0,
                                    type: ''
                                 }
                              })
                           }
                           setInput('')
                        }}
                        className='px-3 py-2 rounded-sm text-sm bg-blue-600 hover:bg-blue-700 text-white'>Add card</button>
                     <span
                        onClick={() => {
                           setShowInput(false)
                        }}
                        className='text-xl hover:bg-slate-200 rounded-sm ml-2 p-2'><IoMdClose />
                     </span>
                  </div>
               </div>
            }
         </div>
      </div >
   )
}

export default Column