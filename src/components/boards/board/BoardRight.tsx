import React, { memo, useState } from 'react'
import BoardRightHeader from './BoardRightHeader'
import Column from './Column'
import AddAnotherListButton from './AddAnotherListButton'
import { CardType, ColumnType } from '@/types'
import { Container, Draggable } from 'react-smooth-dnd'


const data = [
   {
      id: '1',
      name: 'Column 1',
      cards: [
         {
            id: '1',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '2',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
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
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '5',
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
            id: '1',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '2',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
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
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '5',
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
            id: '1',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '2',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
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
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '5',
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
            id: '1',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '2',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
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
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '5',
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
            id: '1',
            text: 'Cart content',
            labels: ['#E2B203', '#FAA53D', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 1, type: 'image' }
         },
         {
            id: '2',
            text: 'Cart content',
            labels: ['#4BCE97', '#E2B203', '#579DFF'],
            image: { ntn: 0, type: '' }
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
            labels: ['#4BCE97', '#F87462', '#9F8FEF', '#579DFF'],
            image: { ntn: 3, type: 'image' }
         },
         {
            id: '5',
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


   const [columns, setColumns] = useState(data)

   const handleAddCard = (id: string, card: CardType) => {
      const newColumns = columns.map((col) => {
         if (col.id === id) {
            col.cards.push(card)
         }
         return col
      })
      setColumns(newColumns)
   }

   const handleAddList = (list: ColumnType) => {
      const newList = [...columns, list]
      setColumns(newList)
   }

   const onColumnDrop = (dropResult: any) => {
      console.log(dropResult)
   }
   return (
      <div className='h-full w-full z-10'>
         <BoardRightHeader />
         <div className='w-full h-auto'>
            <div className={`p-2 w-full max-h-[calc(100vh-110px)] min-h-[calc(100vh-170px)] overflow-x-auto flex items-start justify-start ${props.showSideBar ? 'max-w-[calc(100vw-260px)]' : 'max-w-[calc(100vw-30px)]'} `}>
               <Container
                  orientation="horizontal"
                  onDrop={onColumnDrop}
                  dragHandleSelector=".column-drag-handle"
                  getChildPayload={(index) => columns[index]}
                  dropPlaceholder={{
                     animationDuration: 150,
                     showOnTop: true,
                     className: 'cards-drop-preview'
                  }}
               >
                  {columns.map((col) => {
                     return (
                        <Draggable key={col.id}>
                           <Column handleAddList={handleAddList} setColumns={setColumns} columns={columns} column={col} handleAddCard={handleAddCard} />
                        </Draggable>
                     )
                  })}
               </Container>
               <AddAnotherListButton handleAddList={handleAddList} currentLength={columns.length + ''} />
            </div>
         </div>
      </div>
   )
}

export default memo(BoardRight)