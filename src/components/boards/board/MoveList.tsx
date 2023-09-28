import { Board, ColumnType, WorkspaceType } from "@/types"
import React, { useEffect, useRef, useState } from "react"
import { RiArrowLeftSLine, RiCloseLine } from "react-icons/ri"
import { useOnClickOutside } from "usehooks-ts"
var uniqid = require("uniqid")

type Props = {
   column: ColumnType
   setShowActions: Function
   moveColumn: Function
   workspaces: WorkspaceType[]
   workspace: WorkspaceType | undefined
   board: Board | undefined
}

function MoveList(props: Props) {
   const [board, setBoard] = useState<Board | undefined>({
      id: "",
      workspaceId: "",
      title: "<board name>",
      columns: [],
      star: false,
      background: {
         ntn: 0,
         type: "",
      },
   })
   const [index, setIndex] = useState(0)

   const [showSelectBoard, setShowSelectBoard] = useState(false)
   const [showSelectIndex, setShowSelectIndex] = useState(false)

   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowActions({ show: false, tab: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

   const move = () => {
      if (board?.id !== "") {
         if (board?.id !== props.board?.id) {
            props.moveColumn(
               board?.workspaceId,
               board?.id,
               index,
               {
                  ...props.column,
                  id: uniqid(),
               },
               props.column.id
            )
         } else {
            alert(`Can't move column within same board!\nPlease use drag-drop!`)
         }
      }
   }

   return (
      <div
         ref={ref}
         onClick={handleClickInside}
         className='drop-menu-shadow pt-1 pb-2 absolute left-[calc(100%-40px)] top-[calc(100%+2px)] w-[306px] bg-white z-10 rounded-md'
      >
         <div className='mx-1 flex items-center justify-between'>
            <span
               onClick={() => {
                  props.setShowActions({ show: true, tab: "" })
               }}
               className='p-2 cursor-pointer rounded-md hover:bg-slate-100'
            >
               <RiArrowLeftSLine />
            </span>
            <h1 className='text-center text-sm font-semibold'>Move list</h1>
            <span
               onClick={() => {
                  props.setShowActions({ show: false, tab: "" })
               }}
               className='p-2 cursor-pointer rounded-md hover:bg-slate-100'
            >
               <RiCloseLine />
            </span>
         </div>
         <div className='p-2 relative'>
            <div
               onClick={() => {
                  setShowSelectBoard(!showSelectBoard)
                  setShowSelectIndex(false)
               }}
               className='w-full p-2 bg-slate-100 rounded-md flex flex-col my-2 cursor-pointer relative'
            >
               <span className='text-xs font-medium text-slate-500'>Board</span>
               <span className='text-sm font-medium'>{board?.title}</span>
               {showSelectBoard && (
                  <div className='absolute left-0 top-[100%] bg-white drop-shadow-lg rounded-sm z-[40] min-w-[300px] py-3'>
                     {props.workspaces.map((w) => {
                        return (
                           <div className='flex flex-col bg-white' key={w.id}>
                              <span className='font-medium text-sm pl-2'>
                                 {w.name}
                              </span>
                              <div className='flex flex-col'>
                                 {w.boards?.map((b) => {
                                    return (
                                       <span
                                          onClick={() => {
                                             console.log(b)
                                             setBoard(b)
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
            <div
               onClick={() => {
                  setShowSelectIndex(!showSelectIndex)
               }}
               className='w-full p-2 bg-slate-100 rounded-md flex flex-col my-2 cursor-pointer relative'
            >
               <span className='text-xs font-medium text-slate-500'>
                  Position
               </span>
               <span className='text-sm font-medium'>{index}</span>
               {showSelectIndex && (
                  <div className='absolute left-0 top-[100%] bg-white drop-shadow-lg rounded-sm z-[40] min-w-[300px] flex flex-col py-3'>
                     {board?.columns.map((element, index) => {
                        return (
                           <>
                              <span
                                 onClick={() => {
                                    setIndex(index)
                                    setShowSelectIndex(false)
                                 }}
                                 key={element.id}
                                 className='text-sm font-medium hover:bg-blue-500 hover:text-white pl-2'
                              >
                                 {index}
                              </span>
                           </>
                        )
                     })}
                  </div>
               )}
            </div>
            <button
               onClick={move}
               className='bg-blue-500 py-2 px-4 text-sm rounded-sm text-slate-50 font-medium'
            >
               Move
            </button>
         </div>
      </div>
   )
}

export default MoveList
