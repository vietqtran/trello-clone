import {
   Board,
   CardType,
   ColumnType,
   DateFieldType,
   FieldType,
   NumberFieldType,
   TextFieldType,
   WorkspaceType,
} from "@/types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import React, { useRef, useState } from "react"

import { BiDotsHorizontalRounded } from "react-icons/bi"
import { BsPlusLg } from "react-icons/bs"
import Card from "./Card"
import ColumnOptions from "./ColumnOptions"
import CopyList from "./CopyList"
import { IoMdClose } from "react-icons/io"
import MoveList from "./MoveList"
import { nanoid } from "nanoid"
import { useOnClickOutside } from "usehooks-ts"

type Props = {
   column: ColumnType
   handleAddCard: (columnId: string, card: CardType) => void
   reSetBoard: Function
   columns: ColumnType[]
   handleAddList: (list: ColumnType) => void
   index: number
   handleDeleteList: Function
   updateColumn: Function
   moveColumn: Function
   workspaces: WorkspaceType[]
   workspace: WorkspaceType | null
   board: Board | undefined
   moveCardWithinWorkspace: Function
   moveCardBetweenWorkspaces: Function
   moveCardWithinBoard: Function
}

function Column(props: Props) {
   const [showInput, setShowInput] = useState(false)
   const [input, setInput] = useState("")
   const [showActions, setShowActions] = useState({ show: false, tab: "" })

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShowInput(false)
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   const setLabels = (labels: string[], cardId: string) => {
      const newCards = props.column.cards.map((c) => {
         if (c.id === cardId) {
            return { ...c, labels: labels }
         }
         return c
      })
      const newColumn = { ...props.column, cards: newCards }
      props.updateColumn(newColumn)
   }

   const setCover = (image: { ntn: number; type: string }, cardId: string) => {
      const newCards = props.column.cards.map((c) => {
         if (c.id === cardId) {
            return { ...c, image: image }
         }
         return c
      })
      const newColumn = { ...props.column, cards: newCards }
      props.updateColumn(newColumn)
   }

   const deleteCard = (cardId: string) => {
      const newCards = props.column.cards.filter((c) => {
         return c.id !== cardId
      })
      const newColumn = { ...props.column, cards: newCards }
      props.updateColumn(newColumn)
   }

   const addCardDescription = (cardId: string, description: string) => {
      const newCards = props.column.cards.map((c) => {
         if (c.id === cardId) {
            return { ...c, description: description }
         }
         return c
      })
      const newColumn = { ...props.column, cards: newCards }
      props.updateColumn(newColumn)
   }

   const addField = (columnId: string, cardId: string, field: any) => {
      const col = props.columns.filter((c) => c.id === columnId)[0]
      const newColumn: ColumnType = {
         ...col,
         cards: col.cards.map((c) => {
            if (c.id === cardId) {
               return { ...c, fields: [...c.fields, field] }
            } else {
               return c
            }
         }),
      }
      props.updateColumn(newColumn)
   }

   function updateOrAddField(
      columnId: string,
      cardId: string,
      newField: FieldType
   ) {
      console.log(newField)
      const column = props.columns.find((c) => c.id === columnId)
      if (!column) return
      const card = column.cards.find((c) => c.id === cardId)
      if (!card) return
      const existingField = card.fields.find((f) => f?.id === newField.id)
      if (existingField) {
         const updatedFields = card.fields.map((f) => {
            if (f?.id === existingField.id) {
               return newField
            } else {
               return f
            }
         })
         const updatedCard: CardType = { ...card, fields: updatedFields }
         const updatedColumn: ColumnType = {
            ...column,
            cards: column.cards.map((c) =>
               c.id === card.id ? updatedCard : c
            ),
         }
         props.updateColumn(updatedColumn)
      } else {
         const newFields: FieldType[] = [...card.fields, newField]
         const updatedCard: CardType = { ...card, fields: newFields }
         const updatedColumn: ColumnType = {
            ...column,
            cards: column.cards.map((c) =>
               c.id === card.id ? updatedCard : c
            ),
         }
         props.updateColumn(updatedColumn)
      }
   }

   const removeField = (columnId: string, cardId: string, fieldId: string) => {
      const col = props.columns.filter((c) => c.id === columnId)[0]
      const newColumn: ColumnType = {
         ...col,
         cards: col.cards.map((c) => {
            if (c.id === cardId) {
               return { ...c, fields: c.fields.filter((f) => f.id !== fieldId) }
            } else {
               return c
            }
         }),
      }
      props.updateColumn(newColumn)
   }

   return (
      <Draggable draggableId={props.column.id} index={props.index}>
         {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               className='rightboard column-drag-handle relative flex flex-col items-start justify-start max-h-[calc(100vh-150px)] mx-2 pb-0 pr-0 rounded-xl min-w-[271px] bg-slate-100'
            >
               <div
                  data-is-dragging={snapshot.isDragging}
                  {...provided.dragHandleProps}
                  className='column-drag-handle cursor-pointer relative p-2 pb-0 flex items-center justify-between w-full'
               >
                  <h1 className='font-semibold pl-2'>{props.column.name}</h1>
                  <div
                     onClick={() => {
                        setShowActions({ show: true, tab: "" })
                     }}
                     className='p-2  hover:bg-slate-300 rounded-md cursor-pointer'
                  >
                     <BiDotsHorizontalRounded />
                  </div>
                  {showActions.show && showActions.tab === "" && (
                     <ColumnOptions
                        handleDeleteList={props.handleDeleteList}
                        setShowActions={setShowActions}
                        column={props.column}
                        setShowInput={setShowInput}
                     />
                  )}
                  {showActions.show && showActions.tab === "copy" && (
                     <CopyList
                        handleAddList={props.handleAddList}
                        column={props.column}
                        setShowActions={setShowActions}
                     />
                  )}
                  {showActions.show && showActions.tab === "move" && (
                     <MoveList
                        moveColumn={props.moveColumn}
                        column={props.column}
                        setShowActions={setShowActions}
                        workspaces={props.workspaces}
                        workspace={props.workspace}
                        board={props.board}
                     />
                  )}
               </div>
               <span className='px-4 mb-3 opacity-75 text-sm'>
                  {props.column.cards.length} cards
               </span>
               <Droppable droppableId={props.column.id} type={"column"}>
                  {(droppableProvided) => {
                     return (
                        <div
                           {...droppableProvided.droppableProps}
                           ref={droppableProvided.innerRef}
                           className='column w-full overflow-y-auto px-2 min-h-[1px]'
                        >
                           {props.column.cards.map((card, index) => {
                              return (
                                 <Card
                                    updateColumn={props.updateColumn}
                                    deleteCard={deleteCard}
                                    setCover={setCover}
                                    setLabels={setLabels}
                                    column={props.column}
                                    columns={props.columns}
                                    key={card.id}
                                    index={index}
                                    card={card}
                                    moveCardBetweenWorkspaces={
                                       props.moveCardBetweenWorkspaces
                                    }
                                    workspaces={props.workspaces}
                                    board={props.board}
                                    moveCardWithinWorkspace={
                                       props.moveCardWithinWorkspace
                                    }
                                    workspace={props.workspace}
                                    moveCardWithinBoard={
                                       props.moveCardWithinBoard
                                    }
                                    addCardDescription={addCardDescription}
                                    addField={addField}
                                    removeField={removeField}
                                    updateOrAddField={updateOrAddField}
                                    reSetBoard={props.reSetBoard}
                                 />
                              )
                           })}
                           {droppableProvided.placeholder}
                        </div>
                     )
                  }}
               </Droppable>

               <div className='p-2 w-full mt-2 cursor-pointer'>
                  {!showInput && (
                     <div
                        onClick={() => {
                           setShowInput(true)
                        }}
                        className='flex items-center justify-start rounded-md hover:bg-slate-300 p-2'
                     >
                        <span className='mr-3'>
                           <BsPlusLg />
                        </span>
                        <span>Add a card</span>
                     </div>
                  )}
                  {showInput && (
                     <div
                        ref={ref}
                        onClick={handleClickInside}
                        className='p-1 rounded-md w-full'
                     >
                        <textarea
                           placeholder='Enter a title for this card...'
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
                                       id: nanoid(),
                                       text: input,
                                       labels: [],
                                       image: {
                                          ntn: 0,
                                          type: "",
                                       },
                                       comments: [],
                                       description: "",
                                       fields: [],
                                    })
                                 }
                                 setInput("")
                              }}
                              className='px-3 py-2 rounded-sm text-sm bg-blue-600 hover:bg-blue-700 text-white'
                           >
                              Add card
                           </button>
                           <span
                              onClick={() => {
                                 setShowInput(false)
                              }}
                              className='text-xl hover:bg-slate-200 rounded-sm ml-2 p-2'
                           >
                              <IoMdClose />
                           </span>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
      </Draggable>
   )
}

export default Column
