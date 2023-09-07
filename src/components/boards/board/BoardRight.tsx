import React, { memo, useState } from 'react'
import BoardRightHeader from './BoardRightHeader'
import Column from './Column'
import AddAnotherListButton from './AddAnotherListButton'
import { CardType, ColumnType } from '@/types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const data = [
   {
      id: '1',
      name: 'Column 1',
      cards: [
         {
            id: '11',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '21',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
         },
         {
            id: '31',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '41',
            text: 'Cart content',
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '51',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203'],
            image: { ntn: 0, type: '' }
         }
      ]
   },
   {
      id: '2',
      name: 'Column 2',
      cards: [
         {
            id: '12',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '22',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
         },
         {
            id: '32',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '42',
            text: 'Cart content',
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '52',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203'],
            image: { ntn: 0, type: '' }
         }
      ]
   },
   {
      id: '3',
      name: 'Column 3',
      cards: [
         {
            id: '13',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '23',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
         },
         {
            id: '33',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '43',
            text: 'Cart content',
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '53',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203'],
            image: { ntn: 0, type: '' }
         }
      ]
   },
   {
      id: '4',
      name: 'Column 4',
      cards: [
         {
            id: '14',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '24',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
         },
         {
            id: '34',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '44',
            text: 'Cart content',
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '54',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203'],
            image: { ntn: 0, type: '' }
         }
      ]
   },
   {
      id: '5',
      name: 'Column 5',
      cards: [
         {
            id: '15',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '25',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
         },
         {
            id: '35',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '45',
            text: 'Cart content',
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '55',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203'],
            image: { ntn: 0, type: '' }
         }
      ]
   }
]

type Props = {
   showSideBar: boolean
}

function BoardRight(props: Props) {


   const [columns, setColumns] = useState<ColumnType[]>(data)

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

   const onColumnDrop = () => { }

   const onDragEnd = () => { }
   const isCombineEnabled = () => { }
   const containerHeight = () => { }
   return (
      <div className='h-full w-full z-10'>
         <BoardRightHeader />
         <DragDropContext
            onDragEnd={(result) => {
               console.log(result)
            }}
         >
            <div className='w-full h-auto'>
               <Droppable direction='horizontal' droppableId="board">
                  {(droppableProvided) => (
                     <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className={`p-2 w-full max-h-[calc(100vh-110px)] min-h-[calc(100vh-170px)] overflow-x-auto flex items-start justify-start ${props.showSideBar ? 'max-w-[calc(100vw-260px)]' : 'max-w-[calc(100vw-30px)]'} `}
                     >
                        {columns.map((col, index) => {
                           return (
                              <Column key={col.id}
                                 index={index}
                                 handleAddList={handleAddList}
                                 setColumns={setColumns}
                                 columns={columns}
                                 column={col}
                                 handleAddCard={handleAddCard} />
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

export default memo(BoardRight)