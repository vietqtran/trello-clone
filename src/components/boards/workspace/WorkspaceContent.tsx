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
import { db } from "../../../../utils/firebase"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"

type Props = {
   workspace: WorkspaceType | undefined
   workspaces: WorkspaceType[] | undefined
   addBoard: Function
   changeStar: Function
}
function WorkspaceContent(props: Props) {
   const [search, setSearch] = useState("")

   return (
      <div className='w-full mx-auto mb-10'>
         <span className='text-xl font-semibold my-8 block'>Boards</span>
         <div className='w-full my-3'>
            <span className='text-xs font-bold'>Sort by</span>
            <div
               className='relative group hover:bg-slate-50 cursor-pointer w-[200px] h-[32px] flex items-center justify-between border-2 px-2 text-sm rounded-sm py-1
                  before:contents-[] before:absolute before:top-[20px] before:left-0 before:w-full before:h-[20px] before:bg-transparent
            '
            >
               <div>
                  <span>Most recently active</span>
               </div>
               <span>
                  <MdOutlineKeyboardArrowDown />
               </span>
               <div className='z-10 hidden bg-white group-hover:block w-full drop-menu-shadow rounded-md absolute top-[35px] left-0'>
                  <ul className='w-full my-2'>
                     <li className='p-2 w-full hover:bg-blue-100'>
                        Most recently active
                     </li>
                     <li className='p-2 w-full hover:bg-blue-100'>
                        Least recently active
                     </li>
                     <li className='p-2 w-full hover:bg-blue-100'>
                        Alphabetically A-Z
                     </li>
                     <li className='p-2 w-full hover:bg-blue-100'>
                        Alphabetically Z-A
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className='my-3 py-1 rounded-sm z-[-1]'>
            <div>
               <span className='text-xs font-bold'>Search</span>
            </div>
            <div className='relative hover:bg-slate-50 border-2 flex items-center w-fit'>
               <input
                  type='text'
                  className='pl-7 text-sm bg-transparent outline-none h-[32px] w-[250px]'
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value)
                  }}
                  placeholder='Search boards'
               />
               <div className='absolute top-[50%] px-2 translate-y-[-50%] left-0'>
                  <FiSearch />
               </div>
            </div>
         </div>
         <div className='w-full grid grid-cols-12 gap-3'>
            <div className='relative cursor-pointer group bg-slate-100 bg-cover rounded-sm lg:col-span-3 md:col-span-4 col-span-6 w-full min-h-[100px]'>
               <div className='absolute top-0 left-0 w-full'>
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
