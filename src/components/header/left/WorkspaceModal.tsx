<<<<<<< HEAD
import Image from "next/image"
import React, { useState, useRef, useEffect } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { GrClose } from "react-icons/gr"
import { db } from "@/firebase"
import { collection, addDoc } from "@firebase/firestore"
import { useRouter } from "next/navigation"
import { User, WorkspaceType } from "@/types"
=======
import React, { useEffect, useRef, useState } from "react"
import { addDoc, collection } from "@firebase/firestore"

>>>>>>> 535644d (change to redux)
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GrClose } from "react-icons/gr"
import Image from "next/image"
import { User } from "@/types"
import { db } from "../../../../utils/firebase"
import { useOnClickOutside } from "usehooks-ts"
import { useRouter } from "next/navigation"

type Props = {
   setShowModal: Function
}

const options = [
   { value: "Operations", label: "Operations" },
   { value: "Marketing", label: "Marketing" },
   { value: "Human Resources", label: "Human Resources" },
   { value: "Small Business", label: "Engineering-IT" },
   { value: "Education", label: "Education" },
   { value: "Sales CRM", label: "Sales CRM" },
   { value: "Other", label: "Other" },
]

function WorkspaceModal(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowModal({ show: false, type: "" })
   }
   const handleClickInside = () => {}
   useOnClickOutside(ref, handleClickOutside)

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
               return
            }
         } catch (error) {}
      }
      getUser()
   }, [])

   const router = useRouter()
   const [title, setTitle] = useState("")
   const [workspace, setWorkspace] = useState("")
   const [description, setDescription] = useState("")

   const workspaceCollectionRef = collection(db, "workspaces")

   const addWorkspace = async () => {
      await addDoc(workspaceCollectionRef, {
         name: title,
         type: workspace,
         description: description,
         boards: [],
         userId: user.id,
         role: 1,
      }).then((dataRef) => {
         router.push(`/boards/${dataRef.id}`)
         return
      })
   }

   return (
      <div className='z-50 p-5 w-full h-full min-h-[100vh] top-0 left-0 right-0 bottom-0 fixed bg-black bg-opacity-75 flex items-start justify-center'>
         <div
            className={`modal h-full overflow-y-scroll relative w-full md:bg-[url('/assets/other/workspace-modal-bg.png')] bg-[url('/assets/other/workspace-modal-bg-mobile.png')] bg-no-repeat bg-cover rounded-md bg-white container lg:mx-40 md:mx-20 grid grid-cols-2`}
            onClick={handleClickInside}
            ref={ref}
         >
            <div className='col-span-2 flex items-start justify-end'>
               <span
                  onClick={handleClickOutside}
                  className='w-fit float-right z-100 m-2 p-3 hover:bg-white cursor-pointer rounded-md'
               >
                  <GrClose />
               </span>
            </div>
            <div className='lg:col-span-1 col-span-2 flex items-start justify-center md:px-20 px-5 py-10 flex-col md:order-1 order-2'>
               <h1 className='font-semibold text-2xl mb-2'>
                  {`Let's build a Workspace`}
               </h1>
               <p className='text-lg font-semibold leading-6 mb-5'>
                  Boost your productivity by making it easier for everyone to
                  access boards in one location.
               </p>
               <div className=' w-full mb-3 flex flex-col items-start mt-3 justify-center'>
                  <label htmlFor='title' className='font-bold text-xs mb-2'>
                     Workspace name <span className='text-red-600'>*</span>
                  </label>
                  <input
                     type='text'
                     id='title'
                     className={`block w-full p-2 outline-none border-2 focus:border-blue-500 rounded-md`}
                     value={title}
                     name='title'
                     placeholder={`Taco's Co.`}
                     onChange={(e) => {
                        setTitle(e.target.value)
                     }}
                  />
                  <span className='text-xs mt-2'>
                     This is the name of your company, team or organization.
                  </span>
                  <label
                     htmlFor='workspace'
                     className='font-bold text-xs mt-3 mb-2'
                  >
                     Workspace type
                  </label>
                  <select
                     value={workspace}
                     onChange={(e) => {
                        setWorkspace(e.target.value)
                     }}
                     name='workspace'
                     id='workspace'
                     className='w-full outline-none p-2 focus:border-blue-500 border-2 rounded-md'
                  >
                     <option hidden value={""} defaultChecked>
                        Choose...
                     </option>
                     {options.map((o) => {
                        return (
                           <option key={o.value} value={o.value}>
                              {o.label}
                           </option>
                        )
                     })}
                  </select>
                  <label
                     htmlFor='description'
                     className='font-bold text-xs mb-2 mt-3'
                  >
                     Workspace description{" "}
                     <span className='text-red-600'>*</span>
                  </label>
                  <textarea
                     id='description'
                     className={`block w-full p-2 outline-none border-2 focus:border-blue-500 rounded-md min-h-[150px]`}
                     value={description}
                     onChange={(e) => {
                        setDescription(e.target.value)
                     }}
                     name='description'
                     placeholder={`Our team organizes everything here.`}
                  />
                  <span className='text-xs mt-2'>
                     Get your members on board with a few words about your
                     Workspace.
                  </span>
                  <button
                     onClick={addWorkspace}
                     type={
                        title !== "" && workspace !== "" ? "submit" : "button"
                     }
                     className={`w-full py-2 rounded-md mt-3  ${
                        title !== "" && workspace !== ""
                           ? "bg-blue-500 text-white  hover:bg-blue-400"
                           : "bg-slate-200 text-gray-500 cursor-default"
                     }`}
                  >
                     Create
                  </button>
               </div>
            </div>
            <div className=' lg:col-span-1 col-span-2 flex items-center justify-center md:order-2 order-1 z-0'>
               <div className='relative'>
                  <Image
                     priority
                     src={"/assets/other/preview-workspace-modal.svg"}
                     width={400}
                     height={400}
                     alt='preview'
                  />
                  <Image
                     priority
                     className='absolute left-[20px] bottom-[10px]'
                     src={"/assets/other/preview-workspace-modal-face.svg"}
                     width={100}
                     height={100}
                     alt='preview'
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default WorkspaceModal
