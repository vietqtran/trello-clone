import React, { memo, useState } from 'react'
import BoardRightHeader from './BoardRightHeader'
import Column from './Column'
import AddAnotherListButton from './AddAnotherListButton'
import { Board, CardType, ColumnType } from '@/types'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

type Props = {
   showSideBar: boolean,
   board: Board | undefined
}

function BoardRight(props: Props) {

   const [columns, setColumns] = useState<ColumnType[]>([])

   const handleAddCard = (id: string, card: CardType) => {
      const newColumns = columns.map((col) => {
         if (col.id === id) {
            return { ...col, cards: [...col.cards, card] }
         }
         return col
      })
      setColumns(newColumns)
   }

   const handleAddList = (list: ColumnType) => {
      const newList = [...columns, list]
      setColumns(newList)
   }

   const handleDeleteList = (id: string) => {
      const newList = columns.filter((col) => {
         return col.id != id
      })
      setColumns(newList)
   }

   const reorder = (result: DropResult) => {
      if (!result.destination || !result.source) {
         return
      } else {
         if (result.destination.droppableId === 'board' && result.source.droppableId === 'board') {
            const newColumns = Array.from(columns);
            const [removed] = newColumns.splice(result.source.index, 1);
            newColumns.splice(result.destination.index, 0, removed);
            setColumns(newColumns)
         } else {
            console.log(result)
            if (result.destination.droppableId === result.source.droppableId) {
               const columnActive = columns.find((col) => {
                  return col.id === result.source.droppableId
               })
               const tempStart: CardType | undefined = columnActive?.cards[result.source.index]
               if (tempStart) {
                  columnActive?.cards.splice(result.source.index, 1)
                  columnActive?.cards.splice(result.destination.index, 0, tempStart)
               }
               const newList = columns.map((col) => {
                  if (col.id === columnActive?.id) {
                     return columnActive
                  } else {
                     return col
                  }
               })
               setColumns(newList)
            } else {
               const cardSource: CardType | undefined = columns.find((col) => {
                  return col.id === result.source.droppableId
               })?.cards.find((card) => {
                  return card.id === result.draggableId
               })
               const columnEnd = columns.find((col) => {
                  return col.id === result.destination?.droppableId
               })
               console.log(columnEnd)
               const columnStart = columns.find((col) => {
                  return col.id === result.source.droppableId
               })
               console.log(columnStart)
               if (cardSource) {
                  columnEnd?.cards.splice(result.destination.index, 0, cardSource)
               }
               columnStart?.cards.splice(result.source.index, 1)
               const newList = columns.map((col) => {
                  if (col.id === columnStart?.id) {
                     return columnStart
                  } else if (col.id === columnEnd?.id) {
                     return columnEnd
                  } else {
                     return col
                  }
               })
               setColumns(newList)
            }
         }
      }
   }

   return (
      <div className='h-full w-full z-10'>
         <BoardRightHeader board={props.board} />
         <DragDropContext
            onDragEnd={(result) => {
               reorder(result)
            }}
         >
            <div className='w-full h-auto'>
               <Droppable direction='horizontal' droppableId="board">
                  {(droppableProvided) => (
                     <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className={`p-2 w-full max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] overflow-x-auto flex items-start justify-start ${props.showSideBar ? 'max-w-[calc(100vw-260px)]' : 'max-w-[calc(100vw-30px)]'} `}
                     >
                        {columns.map((col, index) => {
                           return (
                              <Column key={col.id}
                                 index={index}
                                 handleAddList={handleAddList}
                                 setColumns={setColumns}
                                 columns={columns}
                                 column={col}
                                 handleAddCard={handleAddCard}
                                 handleDeleteList={handleDeleteList}
                              />
                           )
                        })}
                        {droppableProvided.placeholder}
                        <AddAnotherListButton handleAddList={handleAddList} currentLength={columns.length + ''} />
                     </div>
                  )}
               </Droppable>
            </div>
         </DragDropContext>
      </div>
   )
}

export default BoardRight