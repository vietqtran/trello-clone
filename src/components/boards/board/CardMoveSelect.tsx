import { Board, CardType, ColumnType, WorkspaceType } from "@/types"
import React, { memo, useRef, useState } from "react"
import { GrClose } from "react-icons/gr"
var uniqid = require("uniqid")

type Props = {
   moveCardBetweenWorkspaces: Function
   setShowMoveSelect: Function
   workspaces: WorkspaceType[]
   board: Board | undefined
   card: CardType
   column: ColumnType
   deleteCard: Function
}

function CardMoveSelect(props: Props) {
   const [showSelect, setShowSelect] = useState({ show: false, tab: "" })
   const [board, setBoard] = useState<Board>()
   const [column, setColumn] = useState<ColumnType>()
   const [position, setPosition] = useState<number>(NaN)

   const move = () => {
      props.moveCardBetweenWorkspaces(
         board,
         column,
         props.card,
         position,
         props.column,
         props.board
      )
   }

   return (
      <div className='drop-menu-shadow p-2 absolute right-0 top-[calc(100%+6px)] w-[306px] bg-white z-10 rounded-md'>
         <div className=' flex items-center justify-center relative'>
            <h1 className='text-sm font-semibold py-1'>Move Card</h1>
            <div
               onClick={() => {
                  props.setShowMoveSelect(false)
               }}
               className='absolute hover:bg-slate-100 p-2 rounded-md cursor-pointer opacity-70 top-0 right-0 text-sm'
            >
               <GrClose />
            </div>
         </div>
         <div className='px-2 mt-7'>
            <span className='text-xs mb-2 block font-semibold'>
               Select destination
            </span>
            <div className='w-full grid grid-cols-3 gap-2'>
               <div className='w-full col-span-3 p-2 py-1 rounded-md bg-slate-100 cursor-pointer relative'>
                  <div
                     onClick={() => {
                        setShowSelect({
                           show: !showSelect.show,
                           tab: "board",
                        })
                     }}
                  >
                     <h1 className='text-xs font-medium leading-4'>Board</h1>
                     <span className='text-xs font-semibold'>
                        {board?.title ? board.title : "Select Board"}
                     </span>
                  </div>
                  {showSelect.show && showSelect.tab === "board" && (
                     <div className='absolute left-0 top-[100%] bg-white drop-shadow-lg rounded-sm z-[40] min-w-[300px] py-3'>
                        {props.workspaces.map((w) => {
                           return (
                              <div
                                 className='flex flex-col bg-white'
                                 key={w.id}
                              >
                                 <span className='font-medium text-sm pl-2'>
                                    {w.name}
                                 </span>
                                 <div className='flex flex-col'>
                                    {w.boards?.map((b) => {
                                       return (
                                          <span
                                             onClick={() => {
                                                setBoard(b)
                                                setColumn({
                                                   id: "",
                                                   name: "Select Column",
                                                   cards: [],
                                                })
                                                setPosition(NaN)
                                                setShowSelect({
                                                   show: false,
                                                   tab: "",
                                                })
                                             }}
                                             key={b.id}
                                             className='pl-10 hover:bg-blue-500 hover:text-white'
                                          >
                                             {b.title}
                                          </span>
                                       )
                                    })}
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  )}
               </div>
               <div className='col-span-2 p-2 py-1 rounded-md bg-slate-100 relative cursor-pointer'>
                  <div
                     onClick={() => {
                        setShowSelect({ show: !showSelect.show, tab: "column" })
                     }}
                  >
                     <h1 className='text-xs font-medium leading-4'>List</h1>
                     <span className='text-xs font-semibold'>
                        {column ? column.name : "Select Column"}
                     </span>
                  </div>
                  {showSelect.show && showSelect.tab === "column" && (
                     <div className='absolute left-0 top-[100%] bg-white drop-shadow-lg rounded-sm z-[40] min-w-[300px]'>
                        {!(board?.columns && board.columns.length > 0) && (
                           <div className='p-3'>
                              There is no List in this Board.
                           </div>
                        )}
                        {board?.columns &&
                           board.columns.length > 0 &&
                           board.columns.map((c) => {
                              return (
                                 <span
                                    onClick={() => {
                                       setColumn(c)
                                       setPosition(NaN)
                                       setShowSelect({
                                          show: false,
                                          tab: "",
                                       })
                                    }}
                                    key={c.id}
                                    className='pl-5 py-1 hover:bg-blue-500 block w-full hover:text-white'
                                 >
                                    {c.name}
                                 </span>
                              )
                           })}
                     </div>
                  )}
               </div>
               <div className='col-span-1 p-2 py-1 rounded-md bg-slate-100 relative cursor-pointer'>
                  <div
                     onClick={() => {
                        setShowSelect({
                           show: !showSelect.show,
                           tab: "position",
                        })
                     }}
                  >
                     <h1 className='text-xs font-medium leading-4'>Position</h1>
                     <span className='text-xs font-semibold'>
                        {!Number.isNaN(position) ? position : "Index"}
                     </span>
                  </div>
                  {column?.id !== "" &&
                     showSelect.show &&
                     showSelect.tab === "position" && (
                        <div className='absolute left-0 top-[100%] bg-white drop-shadow-lg rounded-sm z-[40] min-w-[300px]'>
                           {column?.cards.length === 0 && (
                              <span
                                 onClick={() => {
                                    setPosition(0)
                                    setShowSelect({
                                       show: false,
                                       tab: "",
                                    })
                                 }}
                                 className='pl-5 hover:bg-blue-500 block w-full hover:text-white'
                              >
                                 0
                              </span>
                           )}
                           {column &&
                              column.cards.length >= 1 &&
                              column.cards.map((c, i) => {
                                 return (
                                    <span
                                       onClick={() => {
                                          setPosition(i)
                                          setShowSelect({
                                             show: false,
                                             tab: "",
                                          })
                                       }}
                                       key={c.id}
                                       className='pl-5 hover:bg-blue-500 block w-full hover:text-white'
                                    >
                                       {i}
                                    </span>
                                 )
                              })}
                        </div>
                     )}
               </div>
            </div>
            <button
               onClick={move}
               className='py-2 px-5 my-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-sm '
            >
               Move
            </button>
         </div>
      </div>
   )
}

export default memo(CardMoveSelect)
