import React, { useRef, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import Card from './Card'
import { useOnClickOutside } from 'usehooks-ts'
import ColumnOptions from './ColumnOptions'
import { CardType, ColumnType } from '@/types'
import CopyList from './CopyList'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import uuid from 'react-uuid'

type Props = {
   column: ColumnType,
   handleAddCard: (columnId: string, card: CardType) => void,
   setColumns: Function,
   columns: ColumnType[],
   handleAddList: (list: ColumnType) => void,
   index: number,
   handleDeleteList: Function
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
   return (
      <Draggable draggableId={props.column.id} index={props.index}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               className='rightboard column-drag-handle relative flex flex-col items-start justify-start max-h-[calc(100vh-150px)] mx-2 pr-0 rounded-md min-w-[271px] bg-slate-100'>
               <div
                  data-is-dragging={snapshot.isDragging}
                  {...provided.dragHandleProps}
                  className='column-drag-handle cursor-pointer relative p-2 flex items-center justify-between w-full'
               >
                  <h1

                     className='font-semibold pl-2'>{props.column.name}
                  </h1>
            <div
               onClick={() => {
                  setShowActions({ show: true, tab: '' })
               }}
               className=' p-2 hover:bg-slate-300 rounded-md cursor-pointer'>
               <BiDotsHorizontalRounded />
            </div>
                  {showActions.show && showActions.tab === '' && <ColumnOptions
                     handleDeleteList={props.handleDeleteList}
                     setShowActions={setShowActions}
                     column={props.column}
                     setShowInput={setShowInput} />}
                  {showActions.show && showActions.tab === 'copy' && <CopyList
                     handleAddList={props.handleAddList}
                     column={props.column}
                     setShowActions={setShowActions} />}
         </div>
               <Droppable
                  droppableId={props.column.id}
                  type={'column'}
               >
                  {(droppableProvided) => {
                     return <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className='column w-full overflow-y-auto px-2'>
                        {props.column.cards.map((card, index) => {
                           return (
                              <Card key={card.id} index={index} card={card} />
                           )
                        })}
                        {droppableProvided.placeholder}
                     </div>
                  }}
               </Droppable>

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
                                 id: uuid(),
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
         )}
      </Draggable>
   )
}

export default Column