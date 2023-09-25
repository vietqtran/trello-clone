import React, { memo, useEffect, useState } from "react"
import BoardRightHeader from "./BoardRightHeader"
import Column from "./Column"
import AddAnotherListButton from "./AddAnotherListButton"
import { Board, CardType, ColumnType, WorkspaceType } from "@/types"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"

// Define the Props type for the BoardRight component
type Props = {
   showSideBar: boolean
   board: Board | undefined
   starBoard: Function
   renameBoard: Function
   reSetBoard: Function
   updateColumn: Function,
   moveColumn: Function
   workspaces: WorkspaceType[]
   workspace: WorkspaceType|undefined
}

function BoardRight(props: Props) {
   // Function to add a card to a column
   const handleAddCard = (id: string, card: CardType) => {
      const newColumns = props.board?.columns.map((col) => {
         if (col.id === id) {
            return { ...col, cards: [...col.cards, card] }
         }
         return col
      })
      props.reSetBoard(newColumns)
   }

   // Function to add a new list (column)
   const handleAddList = (list: ColumnType) => {
      const newList = [...(props.board?.columns || []), list]
      props.reSetBoard(newList)
   }

   // Function to delete a list (column)
   const handleDeleteList = (id: string) => {
      const newList = props.board?.columns.filter((col) => {
         return col.id !== id
      })
      props.reSetBoard(newList)
   }

   // Function to handle reordering of columns and cards
   const reorder = (result: DropResult) => {
      if (!result.destination || !result.source) {
         return
      } else {
         if (
            result.destination.droppableId === "board" &&
            result.source.droppableId === "board"
         ) {
            // Reorder columns within the board
            const newColumns = Array.from(props.board?.columns || [])
            const [removed] = newColumns.splice(result.source.index, 1)
            newColumns.splice(result.destination.index, 0, removed)
            props.reSetBoard(newColumns)
         } else {
            if (result.destination.droppableId === result.source.droppableId) {
               // Reorder cards within the same column
               const columnActive = props.board?.columns.find((col) => {
                  return col.id === result.source.droppableId
               })
               const tempStart: CardType | undefined =
                  columnActive?.cards[result.source.index]
               if (tempStart) {
                  columnActive?.cards.splice(result.source.index, 1)
                  columnActive?.cards.splice(
                     result.destination.index,
                     0,
                     tempStart
                  )
               }
               const newList = props.board?.columns.map((col) => {
                  if (col.id === columnActive?.id) {
                     return columnActive
                  } else {
                     return col
                  }
               })
               props.reSetBoard(newList)
            } else {
               // Move a card from one column to another
               const cardSource: CardType | undefined = props.board?.columns
                  .find((col) => {
                     return col.id === result.source.droppableId
                  })
                  ?.cards.find((card) => {
                     return card.id === result.draggableId
                  })
               const columnEnd = props.board?.columns.find((col) => {
                  return col.id === result.destination?.droppableId
               })
               const columnStart = props.board?.columns.find((col) => {
                  return col.id === result.source.droppableId
               })
               if (cardSource) {
                  columnEnd?.cards.splice(
                     result.destination.index,
                     0,
                     cardSource
                  )
               }
               columnStart?.cards.splice(result.source.index, 1)
               const newList = props.board?.columns.map((col) => {
                  if (col.id === columnStart?.id) {
                     return columnStart
                  } else if (col.id === columnEnd?.id) {
                     return columnEnd
                  } else {
                     return col
                  }
               })
               props.reSetBoard(newList)
            }
         }
      }
   }

   return (
      <div className='h-full w-full z-10'>
         {/* Render the board header */}
         <BoardRightHeader
            renameBoard={props.renameBoard}
            starBoard={props.starBoard}
            board={props.board}
         />
         <DragDropContext
            onDragEnd={(result) => {
               reorder(result)
            }}
         >
            <div className='w-full h-auto'>
               <Droppable direction='horizontal' droppableId='board'>
                  {(droppableProvided) => (
                     <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className={`p-2 w-full max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] overflow-x-scroll flex items-start justify-start ${
                           props.showSideBar
                              ? "max-w-[calc(100vw-260px)]"
                              : "max-w-[calc(100vw-30px)]"
                        } `}
                     >
                        {/* Render the columns */}
                        {props.board?.columns.map((col, index) => {
                           return (
                              <Column
                                 key={col.id}
                                 index={index}
                                 handleAddList={handleAddList}
                                 columns={props.board?.columns || []}
                                 column={col}
                                 handleAddCard={handleAddCard}
                                 handleDeleteList={handleDeleteList}
                                 reSetBoard={props.reSetBoard}
                                 updateColumn={props.updateColumn}
                                 moveColumn={props.moveColumn}
                                 workspaces={props.workspaces}
                                 workspace={props.workspace}
                              />
                           )
                        })}
                        {droppableProvided.placeholder}
                        {/* Render the "Add Another List" button */}
                        <AddAnotherListButton
                           handleAddList={handleAddList}
                           currentLength={props.board?.columns.length + ""}
                        />
                     </div>
                  )}
               </Droppable>
            </div>
         </DragDropContext>
      </div>
   )
}

export default BoardRight
