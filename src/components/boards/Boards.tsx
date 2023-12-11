"use client"

import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai"
import { Board, User, WorkspaceType } from "@/types"
import { HiPlus, HiTemplate } from "react-icons/hi"
import React, { useEffect, useState } from "react"
import { addDoc, collection, getDocs } from "@firebase/firestore"

import AsyncStorage from "@react-native-async-storage/async-storage"
import BoardItem from "./BoardItem"
import { BsTrello } from "react-icons/bs"
import CreateBoardButton from "./CreateBoardButton"
import { RiHomeFill } from "react-icons/ri"
import WorkspaceLeftItem from "./WorkspaceLeftItem"
import WorkspaceModal from "../header/left/WorkspaceModal"
import { changeStar } from "@/userMethods"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"

type Props = {
   workspaces: WorkspaceType[]
   starredBoards: Board[]
   addBoard: Function
   changeStar: Function
}

function Boards(props: Props) {
   const router = useRouter()
   const [tab, setTab] = useState("board")
   const [showModal, setShowModal] = useState({ show: false, type: "" })
   const [user, setUser] = useState<User>({
      id: "123",
      email: "viet",
      password: "",
      recentBoard: [],
      auth: "",
   })
   useEffect(() => {
      const getUser = async () => {
         try {
            const data = await AsyncStorage.getItem("USER")
            if (data) {
               setUser(JSON.parse(data))
            } else {
               router.push("/")
            }
         } catch (error) {}
      }
      getUser()
   }, [])

   console.log(props.workspaces)

   return (
      <div>
         <div className='z-[-1] flex items-start justify-start md:items-start md:justify-center'>
            <div className='grid w-full grid-cols-4 md:w-auto'>
               <div className='relative col-span-1 pt-10'>
                  <div className='sticky left-0 top-[90px] hidden min-w-[260px] max-w-[260px] md:block'>
                     <div>
                        <div
                           onClick={() => {
                              setTab("board")
                           }}
                           className={`${
                              tab === "board" ? "bg-blue-100 text-blue-600" : ""
                           } cursor-pointer hover:bg-blue-100 hover:text-blue-600 mb-1 flex items-center justify-start font-semibold text-sm p-2 pl-3 rounded-md`}
                        >
                           <span className='ml-1 mr-2'>
                              <BsTrello />
                           </span>
                           <span>Boards</span>
                        </div>
                        <div
                           onClick={() => {
                              setTab("template")
                           }}
                           className={`${
                              tab === "template"
                                 ? "bg-blue-100 text-blue-600"
                                 : ""
                           } cursor-pointer hover:bg-blue-100 hover:text-blue-600 mb-1 flex items-center justify-start font-semibold text-sm p-2 pl-3 rounded-md`}
                        >
                           <span className='mr-2 text-lg'>
                              <HiTemplate />
                           </span>
                           <span>Templates</span>
                        </div>
                        <div
                           onClick={() => {
                              setTab("home")
                           }}
                           className={`${
                              tab === "home" ? "bg-blue-100 text-blue-600" : ""
                           } cursor-pointer hover:bg-blue-100 hover:text-blue-600 mb-1 flex items-center justify-start font-semibold text-sm p-2 pl-3 rounded-md`}
                        >
                           <span className='mr-2 text-lg'>
                              <RiHomeFill />
                           </span>
                           <span>Home</span>
                        </div>
                     </div>
                     <hr className='my-3' />
                     <div>
                        <div className='flex items-center justify-between p-2 pb-0'>
                           <h1 className='text-xs font-semibold'>Workspace</h1>
                           <h1
                              onClick={() => {
                                 setShowModal({ show: true, type: "workspace" })
                              }}
                              className='cursor-pointer rounded-md p-2 hover:bg-slate-100'
                           >
                              <HiPlus />
                           </h1>
                        </div>
                        <div className='max-h-[60vh] overflow-y-auto'>
                           {props.workspaces?.map((workspace) => {
                              return (
                                 <WorkspaceLeftItem
                                    key={workspace.id}
                                    workspace={workspace}
                                 />
                              )
                           })}
                        </div>
                     </div>
                  </div>
               </div>
               <div className='col-span-4 ml-0 mt-5 w-full bg-white px-3 md:col-span-3 md:ml-5 md:mt-10 md:px-0'>
                  <div className='mb-10'>
                     <h1 className='mb-4 flex items-center justify-start'>
                        <span className='mr-3 text-2xl'>
                           <AiOutlineStar />
                        </span>
                        <span className='text-base font-bold'>
                           Starred boards
                        </span>
                     </h1>
                     <div className='mt-2 grid w-full grid-cols-12 gap-2'>
                        {props.starredBoards.map((board) => {
                           return (
                              <BoardItem
                                 changeStar={props.changeStar}
                                 workspace={board.workspaceId}
                                 key={board.id}
                                 board={board}
                              />
                           )
                        })}
                     </div>
                  </div>
                  <div className='mb-10'>
                     <h1 className='mb-4 flex items-center justify-start'>
                        <span className='mr-3 text-2xl'>
                           <AiOutlineClockCircle />
                        </span>
                        <span className='text-base font-bold'>
                           Recent viewed
                        </span>
                     </h1>
                     <div className='mt-2 grid w-full grid-cols-12 gap-2'>
                        {user.recentBoard?.map((board) => {
                           if (board !== null) {
                              return (
                                 <BoardItem
                                    changeStar={() => {
                                       changeStar(board.id)
                                    }}
                                    workspace={board.workspaceId}
                                    board={board}
                                    key={board.id}
                                 />
                              )
                           }
                           return null
                        })}
                     </div>
                  </div>

                  <h1 className='mb-5 font-bold'>YOUR WORKSPACES</h1>
                  {props.workspaces?.map((workspace) => {
                     return (
                        <div className='mb-10' key={workspace.id}>
                           <div className='mb-4 flex items-center'>
                              <div className='relative mr-2 w-fit rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 p-5'>
                                 <span className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white'>
                                    {workspace.name.toUpperCase().charAt(0)}
                                 </span>
                              </div>
                              <h1 className='font-bold'>{workspace.name}</h1>
                           </div>
                           <div className='mt-2 grid w-full grid-cols-12 gap-2'>
                              {workspace?.boards?.map((board) => {
                                 return (
                                    <BoardItem
                                       changeStar={props.changeStar}
                                       workspace={workspace.id}
                                       board={board}
                                       key={board.id}
                                    />
                                 )
                              })}
                              <CreateBoardButton
                                 addBoard={props.addBoard}
                                 workspaceId={workspace.id}
                                 workspaces={props.workspaces}
                                 type=''
                              />
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
            {showModal.show && <WorkspaceModal setShowModal={setShowModal} />}
         </div>
      </div>
   )
}

export default Boards
