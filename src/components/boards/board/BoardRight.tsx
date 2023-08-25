import React, { memo, useState } from 'react'
import BoardRightHeader from './BoardRightHeader'
import Column from './Column'
import AddAnotherListButton from './AddAnotherListButton'

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

type Card = {
   id: string,
   text: string,
   labels: string[],
   image: {
      ntn: number,
      type: string
   }
}

type List = {
   id: string,
   name: string,
   cards: Card[]
}

type Props = {
   showSideBar: boolean
}

function BoardRight(props: Props) {

   const [columns, setColumns] = useState(data)

   const handleAddCard = (id: string, card: Card) => {
      const newColumns = columns.map((col) => {
         if (col.id === id) {
            col.cards.push(card)
         }
         return col
      })
      console.log(columns)
      setColumns(newColumns)
   }

   const handleAddList = (list: List) => {
      const newList = [...columns, list]
      setColumns(newList)
   }

   return (
      <div className='h-full w-full z-10'>
         {/* header  */}
         <BoardRightHeader />
         {/* content  */}
         <div className='w-full h-auto'>
            <div className={`p-2 w-full max-h-[calc(100vh-110px)] min-h-[calc(100vh-170px)] overflow-x-auto flex items-start justify-start ${props.showSideBar ? 'max-w-[calc(100vw-260px)]' : 'max-w-[calc(100vw-30px)]'} `}>
               {columns.map((col) => {
                  return <Column key={col.id} column={col} handleAddCard={handleAddCard} />
               })}
               <AddAnotherListButton handleAddList={handleAddList} currentLength={columns.length + ''} />
            </div>
         </div>
      </div>
   )
}

export default memo(BoardRight)