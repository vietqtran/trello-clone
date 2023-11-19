"use client"

import { Board, User, WorkspaceType } from "@/types"
import React, { memo, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import Avatar from "./right/Avatar"
import Create from "./left/Create"
import Image from "next/image"
import Link from "next/link"
import More from "./left/More"
import Recent from "./left/Recent"
import { RootState } from "../../../redux/reducers"
import Search from "./right/Search"
import Starred from "./left/Starred"
import Templates from "./left/Templates"
import WorkspaceModal from "./left/WorkspaceModal"
import Workspaces from "./left/Workspaces"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

type Props = {}

function Header(props: Props) {
   const [showModal, setShowModal] = useState({ show: false, type: "" })
   const starredBoards: Board[] = useSelector(
      (state: RootState) => state.board as Board[]
   ).filter((b) => b.star)
   const user: User = useSelector((state: RootState) => state.user)
   const workspaces: WorkspaceType[] = useSelector(
      (state: RootState) => state.workspaces as WorkspaceType[]
   )

<<<<<<< HEAD
   // State to store user information
   const [user, setUser] = useState<User>({
      id: "123",
      email: "viet",
      password: "",
      recentBoard: [],
      auth: "",
   })

   // Access the Next.js router
   const router = useRouter()

   // Effect to fetch and set user data from storage
   useEffect(() => {
      const getUser = async () => {
         try {
            // Attempt to retrieve user data from storage
            const data = await AsyncStorage.getItem("USER")
            if (data) {
               // If data exists, set it as the user state
               setUser(JSON.parse(data))
            } else {
               // If no data found, navigate to the homepage
               router.push("/")
               return
            }
         } catch (error) {}
      }
      // Call the getUser function when the component mounts
      getUser()
   }, [])

   // Render the component's UI
=======
>>>>>>> 535644d (change to redux)
   return (
      <>
         <div className='z-30 sticky top-0 left-0 right-0 bg-white p-2 border-b-[1px] border-slate-300 flex items-center justify-between'>
            {/* Left side of the header */}
            <div className='flex items-center justify-start'>
               {/* Trello logo */}
               <div className='logo hover:bg-slate-200 rounded-md w-fit'>
                  <Link href={"/boards"}>
                     <Image
                        className='p-2'
                        src={"/assets/trello-logo-blue.svg"}
                        width={100}
                        height={100}
                        alt='logo'
                     />
                  </Link>
               </div>
               {/* More, Create, Workspaces, Recent, Starred, and Templates links */}
               <div className='items-center justify-start md:hidden flex'>
                  <More
                     workspaces={workspaces}
                     starredBoards={starredBoards}
                     recentBoards={user.recentBoard}
                     headerType={""}
                  />
                  <Create
                     workspaceId={workspaces[0]?.id}
                     headerType={""}
                     setShowModal={setShowModal}
                  />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces workspaces={workspaces} headerType={""} />
                  <Recent recentBoards={user.recentBoard} headerType={""} />
                  <Starred starredBoards={starredBoards} headerType={""} />
                  <Templates headerType={""} />
                  <Create
                     workspaceId={workspaces[0]?.id}
                     headerType={""}
                     setShowModal={setShowModal}
                  />
               </div>
            </div>
            {/* Right side of the header */}
            <div className='flex items-center justify-end'>
               {/* Search and Avatar components */}
               <Search headerType={""} />
               <Avatar user={user} headerType={""} />
            </div>
         </div>
         {/* Workspace modal */}
         {showModal.show && showModal.type === "workspace" && (
            <WorkspaceModal setShowModal={setShowModal} />
         )}
      </>
   )
}

// Export the Header component as a memoized component
export default memo(Header)
