import { Board, WorkspaceType } from "@/types"
import React, { useState } from "react"
import {
   addDoc,
   collection,
   doc,
   getDocs,
   updateDoc,
} from "@firebase/firestore"

import BoardItem from "../BoardItem"
import CreateBoardButton from "../CreateBoardButton"
import { FiSearch } from "react-icons/fi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { db } from "@/firebase"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"

type Props = {
   workspace: WorkspaceType | null
   workspaces: WorkspaceType[] | undefined
   addBoard: Function
   changeStar: Function
}
function WorkspaceContent(props: Props) {
   const [search, setSearch] = useState("")

   return (
      <div className='mx-auto mb-10 w-full'>
         <span className='my-8 block text-xl font-semibold'>Boards</span>
         <div className='my-3 w-full'>
            <span className='text-xs font-bold'>Sort by</span>
            <div className='before:contents-[] group relative flex h-[32px] w-[200px] cursor-pointer items-center justify-between rounded-sm border-2 px-2 py-1 text-sm before:absolute before:left-0 before:top-[20px] before:h-[20px] before:w-full before:bg-transparent hover:bg-slate-50'>
               <div>
                  <span>Most recently active</span>
               </div>
               <span>
                  <MdOutlineKeyboardArrowDown />
               </span>
               <div className='drop-menu-shadow absolute left-0 top-[35px] z-10 hidden w-full rounded-md bg-white group-hover:block'>
                  <ul className='my-2 w-full'>
                     <li className='w-full p-2 hover:bg-blue-100'>
                        Most recently active
                     </li>
                     <li className='w-full p-2 hover:bg-blue-100'>
                        Least recently active
                     </li>
                     <li className='w-full p-2 hover:bg-blue-100'>
                        Alphabetically A-Z
                     </li>
                     <li className='w-full p-2 hover:bg-blue-100'>
                        Alphabetically Z-A
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className='z-[-1] my-3 rounded-sm py-1'>
            <div>
               <span className='text-xs font-bold'>Search</span>
            </div>
            <div className='relative flex w-fit items-center border-2 hover:bg-slate-50'>
               <input
                  type='text'
                  className='h-[32px] w-[250px] bg-transparent pl-7 text-sm outline-none'
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value)
                  }}
                  placeholder='Search boards'
               />
               <div className='absolute left-0 top-[50%] translate-y-[-50%] px-2'>
                  <FiSearch />
               </div>
            </div>
         </div>
         <div className='grid w-full grid-cols-12 gap-3'>
            <div className='group relative col-span-6 min-h-[100px] w-full cursor-pointer rounded-sm bg-slate-100 bg-cover md:col-span-4 lg:col-span-3'>
               <div className='absolute left-0 top-0 w-full'>
                  <CreateBoardButton
                     addBoard={props.addBoard}
                     workspaceId={props.workspace?.id || ""}
                     workspaces={props.workspaces}
                     type='button'
                  />
               </div>
            </div>
            {props.workspace?.boards?.map((board) => {
               if (board.title.includes(search)) {
                  return (
                     <BoardItem
                        changeStar={props.changeStar}
                        workspace={props.workspace?.id}
                        key={board.id}
                        board={board}
                     />
                  )
               }
               return null
            })}
         </div>
      </div>
   )
}

export default WorkspaceContent
