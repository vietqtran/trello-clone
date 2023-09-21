"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect, memo } from "react"
import Workspaces from "./left/Workspaces"
import Recent from "./left/Recent"
import Starred from "./left/Starred"
import Create from "./left/Create"
import Search from "./right/Search"
import Avatar from "./right/Avatar"
import More from "./left/More"
import WorkspaceModal from "./left/WorkspaceModal"
import { Board, User, WorkspaceType } from "@/types"
import { useRouter } from "next/navigation"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, getDocs } from "@firebase/firestore"
import { db } from "@/firebase"
import Templates from "./left/Templates"

// Define the Props type that describes the expected props for this component
type Props = {
   workspaces: WorkspaceType[]
   starredBoards: Board[]
   addBoard: Function
}

// Define the Header component
function Header(props: Props) {
   // State to control the display of modal
   const [showModal, setShowModal] = useState({ show: false, type: "" })

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
            }
         } catch (error) {}
      }
      // Call the getUser function when the component mounts
      getUser()
   }, [])

   // Render the component's UI
   return (
      <>
         {/* Header container */}
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
                  <More headerType={""} />
                  <Create
                     workspaceId={props.workspaces[0]?.id}
                     addBoard={props.addBoard}
                     workspaces={props.workspaces}
                     headerType={""}
                     setShowModal={setShowModal}
                  />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces workspaces={props.workspaces} headerType={""} />
                  <Recent recentBoards={user.recentBoard} headerType={""} />
                  <Starred
                     starredBoards={props.starredBoards}
                     headerType={""}
                  />
                  <Templates headerType={""} />
                  <Create
                     workspaceId={props.workspaces[0]?.id}
                     addBoard={props.addBoard}
                     workspaces={props.workspaces}
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
