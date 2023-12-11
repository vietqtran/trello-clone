import { AiOutlineClose } from "react-icons/ai"
import Background from "./Background"
import BackgroundSelect from "./BackgroundSelect"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Image from "next/image"
import React from "react"
import { SlArrowLeft } from "react-icons/sl"
import { WorkspaceType } from "@/types"
import { addRecent } from "@/userMethods"
import { nanoid } from "nanoid"
import useBoard from "@/hooks/board"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
   setShow: Function
   type: string
   workspaces: WorkspaceType[] | undefined
   workspaceId: string
}

function CreateBoard(props: Props) {
   const [selectBg, setSelectBg] = useState({ ntn: 1, type: "image" })
   const [showSelectBg, setShowSelectBg] = useState(false)
   const [title, setTitle] = useState("")
   const [workspace, setWorkspace] = useState(props.workspaceId)
   const router = useRouter()
   const { addBoard } = useBoard("" as string, props.workspaceId ?? "")

   const add = async () => {
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
         workspaceId: props.workspaceId,
      })
      const w = props.workspaces?.find((w) => w.id === props.workspaceId)
      const board = {
         background: selectBg,
         columns: [],
         id: nanoid(),
         star: false,
         title: title,
         workspaceId: w?.id ?? props.workspaceId,
      }
      await addBoard(board)
   }

   return (
      <div
         className={`mb-5 text-black ${
            props.type === "button"
               ? "absolute right-[100%] left-0"
               : "absolute"
         } bg-white top-[calc(100%+10px)] min-w-[306px] left-[-100px] md:left-[-20px] p-1 drop-menu-shadow rounded-md`}
      >
         <div className='flex items-center justify-between text-gray-600'>
            <span
               className='cursor-pointer rounded-md p-3 hover:bg-slate-100'
               onClick={() => {
                  props.setShow({ show: true, tab: "" })
               }}
            >
               <SlArrowLeft />
            </span>
            <span className='font-semibold'>Create board</span>
            <span
               className='cursor-pointer rounded-md p-3 hover:bg-slate-100'
               onClick={() => {
                  props.setShow({ show: false, tab: "" })
               }}
            >
               <AiOutlineClose />
            </span>
         </div>
         <div
            className={`relative mx-auto my-2 flex aspect-video w-[250px] items-center justify-center overflow-hidden rounded-md`}
         >
            <Image
               priority
               className='h-full w-full object-cover'
               src={`/assets/background/bg-${selectBg.type}/bg${selectBg.ntn}.jpg`}
               alt='bg-preview'
               width={200}
               height={150}
            />
            <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
               <Image
                  priority
                  src={"/assets/other/preview-top.svg"}
                  width={500}
                  height={300}
                  alt='preview'
               />
            </div>
         </div>
         <div className='relative px-3'>
            <h1 className='mb-1 mt-3 text-xs font-bold text-gray-600'>
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
               <div className='mt-2 grid grid-cols-6 gap-1'>
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
                     className='col-span-1 flex h-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-md bg-slate-100 hover:bg-slate-300'
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

            <div>
               <label htmlFor='title' className='text-xs font-bold'>
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
               <label htmlFor='workspace' className='mt-3 text-xs font-bold'>
                  Workspace
               </label>
               <select
                  onChange={(e) => {
                     setWorkspace(e.target.value)
                  }}
                  value={workspace}
                  name='workspace'
                  id='workspace'
                  className='w-full overflow-y-scroll rounded-md border-2 border-slate-400 p-2 outline-none'
               >
                  {props.workspaces?.map((workspace) => {
                     return (
                        <option
                           key={workspace.id}
                           value={workspace.id}
                           className='flex flex-col p-2'
                           aria-checked={
                              workspace.id == props.workspaceId ? true : false
                           }
                        >
                           {workspace.name}
                        </option>
                     )
                  })}
               </select>
               <button
                  onClick={add}
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
   )
}

export default CreateBoard
