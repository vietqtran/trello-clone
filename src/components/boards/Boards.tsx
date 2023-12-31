"use client"

import React, { useState, useEffect } from "react"
import { BsTrello } from "react-icons/bs"
import { HiTemplate, HiPlus } from "react-icons/hi"
import { RiHomeFill } from "react-icons/ri"
import WorkspaceLeftItem from "./WorkspaceLeftItem"
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai"
import BoardItem from "./BoardItem"
import CreateBoardButton from "./CreateBoardButton"
import { collection, addDoc, getDocs } from "@firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import WorkspaceModal from "../header/left/WorkspaceModal"
import { Board, User, WorkspaceType } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { changeStar } from "@/userMethods"

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

   return (
      <div>
         <div className='z-[-1] flex md:items-start md:justify-center justify-start items-start'>
            <div className='grid grid-cols-4 w-full md:w-auto'>
               <div className='col-span-1 pt-10 relative'>
                  <div className='sticky left-0 top-[90px] md:block hidden min-w-[260px] max-w-[260px]'>
                     <div>
                        <div
                           onClick={() => {
                              setTab("board")
                           }}
                           className={`${
                              tab === "board" ? "bg-blue-100 text-blue-600" : ""
                           } cursor-pointer hover:bg-blue-100 hover:text-blue-600 mb-1 flex items-center justify-start font-semibold text-sm p-2 pl-3 rounded-md`}
                        >
                           <span className='mr-2 ml-1'>
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
                        <div className='p-2 pb-0 flex items-center justify-between'>
                           <h1 className='font-semibold text-xs'>Workspace</h1>
                           <h1
                              onClick={() => {
                                 setShowModal({ show: true, type: "workspace" })
                              }}
                              className='p-2 hover:bg-slate-100 cursor-pointer rounded-md'
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
               <div className='md:col-span-3 w-full col-span-4 md:mt-10 mt-5 md:px-0 px-3 md:ml-5 ml-0 bg-white'>
                  <div className='mb-10'>
                     <h1 className='flex items-center justify-start mb-4'>
                        <span className='text-2xl mr-3'>
                           <AiOutlineStar />
                        </span>
                        <span className='font-bold text-base'>
                           Starred boards
                        </span>
                     </h1>
                     <div className='grid grid-cols-12 w-full gap-2 mt-2'>
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
                     <h1 className='flex items-center justify-start mb-4'>
                        <span className='text-2xl mr-3'>
                           <AiOutlineClockCircle />
                        </span>
                        <span className='font-bold text-base'>
                           Recent viewed
                        </span>
                     </h1>
                     <div className='grid grid-cols-12 w-full gap-2 mt-2'>
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

                  <h1 className='font-bold mb-5'>YOUR WORKSPACES</h1>
                  {props.workspaces?.map((workspace) => {
                     return (
                        <div className='mb-10' key={workspace.id}>
                           <div className='flex items-center mb-4'>
                              <div className='relative p-5 mr-2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 w-fit'>
                                 <span className='text-white font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                                    {workspace.name.toUpperCase().charAt(0)}
                                 </span>
                              </div>
                              <h1 className='font-bold'>{workspace.name}</h1>
                           </div>
                           <div className='grid grid-cols-12 w-full gap-2 mt-2'>
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
