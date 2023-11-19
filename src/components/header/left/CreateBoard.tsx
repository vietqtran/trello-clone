<<<<<<< HEAD
import Image from "next/image"
import React, { useEffect } from "react"
import { SlArrowLeft } from "react-icons/sl"
import { AiOutlineClose, AiOutlineLock } from "react-icons/ai"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Background from "./Background"
import { useState } from "react"
import BackgroundSelect from "./BackgroundSelect"
import { collection, updateDoc, doc, getDocs } from "@firebase/firestore"
import { db } from "@/firebase"
=======
>>>>>>> 535644d (change to redux)
import { Board, WorkspaceType } from "@/types"
import React, { useEffect } from "react"
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation"

import { AiOutlineClose } from "react-icons/ai"
import Background from "./Background"
import BackgroundSelect from "./BackgroundSelect"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Image from "next/image"
import { RootState } from "../../../../redux/reducers"
import { SlArrowLeft } from "react-icons/sl"
import { addBoardAsync } from "../../../../utils/board/addBoard"
import { addRecent } from "@/userMethods"
import { nanoid } from "nanoid"
<<<<<<< HEAD
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsGlobeAsiaAustralia, BsPeople } from "react-icons/bs"
import AsyncStorage from "@react-native-async-storage/async-storage"
=======
import { useState } from "react"
>>>>>>> 535644d (change to redux)

type Props = {
   setShow: Function
   type: string
}

function CreateBoard(props: Props) {
<<<<<<< HEAD
   const [userId, setUserId] = useState("")

   const getUser = async () => {
      const data = await AsyncStorage.getItem("USER")
      const user = JSON.parse(data || "")
      setUserId(user?.id || "")
   }
   useEffect(() => {
      getUser()
   })
   const [selectBg, setSelectBg] = useState({ ntn: 1, type: "image" })
   const [showSelectBg, setShowSelectBg] = useState(false)
   const [title, setTitle] = useState("")
   const [visibility, setVisibility] = useState("Workspace")
   const [showVisibility, setShowVisibility] = useState(false)
   const [workspace, setWorkspace] = useState(props.workspaceId)
=======
   const pathnameElements = usePathname().split("/")
   const [selectBg, setSelectBg] = useState({ ntn: 1, type: "image" })
   const [showSelectBg, setShowSelectBg] = useState(false)
   const [title, setTitle] = useState("")
   const [workspaceId, setWorkspaceId] = useState(
      pathnameElements[pathnameElements.lastIndexOf("boards") + 1]
   )
>>>>>>> 535644d (change to redux)
   const router = useRouter()
   const dispatch = useDispatch()
   const workspaces: WorkspaceType[] = useSelector(
      (state: RootState) => state.workspaces
   )

   return (
      <>
         <div
            className={`mb-5 text-black ${
               props.type === "button"
                  ? "absolute right-[100%] left-0"
                  : "absolute"
            } bg-white top-[calc(100%+10px)] min-w-[306px] left-[-100px] md:left-[-20px] p-1 drop-menu-shadow rounded-md`}
         >
            <div className='flex items-center justify-between text-gray-600'>
               <span
                  className='p-3 rounded-md hover:bg-slate-100 cursor-pointer'
                  onClick={() => {
                     props.setShow({ show: true, tab: "" })
                  }}
               >
                  <SlArrowLeft />
               </span>
               <span className='font-semibold'>Create board</span>
               <span
                  className='p-3 rounded-md hover:bg-slate-100 cursor-pointer'
                  onClick={() => {
                     props.setShow({ show: false, tab: "" })
                  }}
               >
                  <AiOutlineClose />
               </span>
            </div>
            <div
               className={`relative my-2 aspect-video w-[250px] mx-auto rounded-md overflow-hidden flex items-center justify-center`}
            >
               <Image
                  priority
                  className='w-full h-full object-cover'
                  src={`/assets/background/bg-${selectBg.type}/bg${selectBg.ntn}.jpg`}
                  alt='bg-preview'
                  width={200}
                  height={150}
               />
               <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                  <Image
                     priority
                     src={"/assets/other/preview-top.svg"}
                     width={500}
                     height={300}
                     alt='preview'
                  />
               </div>
            </div>
            <div className='px-3 relative'>
               <h1 className='text-gray-600 font-bold text-xs mt-3 mb-1'>
                  Background
               </h1>
               <div>
                  <div className='grid grid-cols-4 gap-1'>
                     <Background
                        ntn={1}
                        type={"image"}
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={2}
                        type={"image"}
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={3}
                        type={"image"}
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={4}
                        type={"image"}
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                  </div>
                  <div className='grid grid-cols-6 gap-1 mt-2'>
                     <Background
                        ntn={1}
                        type='gradient'
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={2}
                        type='gradient'
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={3}
                        type='gradient'
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={4}
                        type='gradient'
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <Background
                        ntn={5}
                        type='gradient'
                        setSelectBg={setSelectBg}
                        selectBg={selectBg}
                     />
                     <div
                        className='cursor-pointer col-span-1 bg-slate-100 hover:bg-slate-300 flex items-center justify-center rounded-md overflow-hidden h-[30px]'
                        onClick={() => {
                           setShowSelectBg(!showSelectBg)
                        }}
                     >
                        <HiOutlineDotsHorizontal />
                     </div>
                  </div>
               </div>
               {showSelectBg && (
                  <BackgroundSelect
                     setShowSelectBg={setShowSelectBg}
                     setSelectBg={setSelectBg}
                     selectBg={selectBg}
                  />
               )}

               <div className='pb-4'>
                  <label htmlFor='title' className='font-bold text-xs'>
                     Board title <span className='text-red-600'>*</span>
                  </label>
                  <input
                     type='text'
                     id='title'
                     className={`block w-full p-2 outline-none ${
                        title ? "border-blue-500" : "border-red-500"
                     } border-2 rounded-md`}
                     defaultValue={title}
                     onChange={(e) => {
                        setTitle(e.target.value)
                     }}
                     name='title'
                     required
                  />
                  {!title && (
                     <span className='text-sm'>👋 Board title is required</span>
                  )}
                  <br />
                  <label htmlFor='workspace' className='font-bold text-xs mt-3'>
                     Workspace
                  </label>
                  <select
                     onChange={(e) => {
                        setWorkspaceId(e.target.value)
                     }}
                     value={workspaceId}
                     name='workspace'
                     id='workspace'
                     className='overflow-y-scroll w-full outline-none p-2 border-slate-400 border-2 rounded-md'
                  >
                     {workspaces?.map((workspace) => {
                        return (
                           <option
                              key={workspace.id}
                              value={workspace.id}
                              className='p-2 flex flex-col'
                              aria-checked={
                                 workspace.id == workspaceId ? true : false
                              }
                           >
                              {workspace.name}
                           </option>
                        )
                     })}
                  </select>
                  <div className='my-4'>
                     <span className='font-bold text-xs mt-3'>Visibility</span>
                     <div className='w-full outline-none p-2 px-3 border-slate-400 border-2 rounded-md relative'>
                        <div
                           onClick={() => {
                              setShowVisibility(!showVisibility)
                           }}
                           className='flex items-center justify-between w-full'
                        >
                           <span>{visibility}</span>
                           <span className=''>
                              <IoIosArrowDown />
                           </span>
                        </div>
                        {showVisibility && (
                           <div
                              className={`absolute py-2 bg-white drop-menu-shadow text-xs left-0 top-[calc(100%+10px)] rounded-md`}
                           >
                              <div
                                 onClick={() => {
                                    setVisibility("Private")
                                    setShowVisibility(false)
                                 }}
                                 className={`w-full flex items-center justify-between py-2 ${
                                    visibility === "Private"
                                       ? "text-blue-600 bg-blue-100"
                                       : ""
                                 }`}
                              >
                                 <span className='block p-5 text-base'>
                                    <AiOutlineLock />
                                 </span>
                                 <span className='block flex-1'>
                                    <span className='text-sm'>Private</span>
                                    <br />
                                    Only board members can see and edit this
                                    board.
                                 </span>
                              </div>
                              <div
                                 onClick={() => {
                                    setVisibility("Workspace")
                                    setShowVisibility(false)
                                 }}
                                 className={`w-full flex items-center justify-between py-2 ${
                                    visibility === "Workspace"
                                       ? "text-blue-600 bg-blue-100"
                                       : ""
                                 }`}
                              >
                                 <span className='block p-5 text-base'>
                                    <BsPeople />
                                 </span>
                                 <span className='block flex-1'>
                                    <span className='text-sm'>Workspace</span>
                                    <br />
                                    All members of the Project Workspace can see
                                    and edit this board.
                                 </span>
                              </div>
                              <div
                                 onClick={() => {
                                    setVisibility("Public")
                                    setShowVisibility(false)
                                 }}
                                 className={`w-full flex items-center justify-between py-2 ${
                                    visibility === "Public"
                                       ? "text-blue-600 bg-blue-100"
                                       : ""
                                 }`}
                              >
                                 <span className='block p-5 text-base'>
                                    <BsGlobeAsiaAustralia />
                                 </span>
                                 <span className='block flex-1'>
                                    <span className='text-sm'>Public</span>
                                    <br />
                                    Anyone on the internet can see this board.
                                    Only board members can edit.
                                 </span>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
                  <button
                     onClick={async () => {
                        const id = nanoid()
                        addRecent({
                           id: id,
                           background: {
                              ntn: selectBg.ntn,
                              type: selectBg.type,
                           },
                           columns: [],
                           star: false,
                           title: title,
<<<<<<< HEAD
                           workspaceId: props.workspaceId,
                           visibility: visibility,
                        })
                        props.addBoard(selectBg, title, workspace, visibility)
                        router.push(`/boards/${props.workspaceId}/${id}`)
                        return
=======
                           workspaceId: workspaceId,
                        })
                        await addBoardAsync(
                           selectBg,
                           title,
                           workspaces?.find((w) => w.id === workspaceId) || {
                              boards: [],
                              description: "",
                              id: "",
                              name: "",
                              type: "",
                              userId: "",
                           }
                        ).then((res) => {
                           if (res === true) {
                              router.push(`/boards/${workspaceId}/${id}`)
                           }
                           return
                        })
>>>>>>> 535644d (change to redux)
                     }}
                     className={`w-full py-2 rounded-md mt-3 ${
                        title
                           ? "bg-blue-500 text-white"
                           : "bg-slate-200 cursor-not-allowed text-gray-500"
                     }`}
                  >
                     Create
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default CreateBoard
