"use client"

import { Board, WorkspaceType } from "@/types"
import React, { useEffect, useState } from "react"
import {
   collection,
   deleteDoc,
   doc,
   getDocs,
   updateDoc,
} from "@firebase/firestore"
import { usePathname, useRouter } from "next/navigation"

import AsyncStorage from "@react-native-async-storage/async-storage"
import Header from "@/components/header/Header"
import Workspace from "@/components/boards/workspace/Workspace"
import { db } from "../../../../utils/firebase"
import { nanoid } from "nanoid"

export default function WorkspacePage() {
   // Extract the workspace ID from the URL path
   const id = usePathname().split("/").at(-1)

   // Firestore reference to the "workspaces" collection
   const workspaceCollectionRef = collection(db, "workspaces")

   // State to store the user's workspaces
   const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])

   // Next.js router
   const router = useRouter()

   useEffect(() => {
      // Fetch user's workspaces on component mount
      getWorkspaces()
   }, [])

   useEffect(() => {
      // Fetch starred boards
      getStarredBoards()
   }, [])

   // Function to fetch user's workspaces from Firestore
   const getWorkspaces = async () => {
      try {
         // Get the user's data from AsyncStorage
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data || "").id

         // Fetch workspaces from Firestore and filter by userId
         await getDocs(workspaceCollectionRef)
            .then((dataRef) => {
               const newWorkspaces: WorkspaceType[] = []
               dataRef.docs.forEach((doc) => {
                  newWorkspaces.push({
                     id: doc.id,
                     userId: String(doc.data().userId),
                     name: String(doc.data().name),
                     type: String(doc.data().type),
                     boards: doc.data().boards,
                     description: String(doc.data().description),
                     role: 1,
                  })
               })
               setWorkspaces(newWorkspaces)
            })
            .catch((err) => {})
      } catch (error) {}
   }

   // Function to add a new board
   const addBoard = async (
      selectBg: { ntn: number; type: string },
      title: string,
      workspace: string,
      visibility: string
   ) => {
      try {
         const data = await AsyncStorage.getItem("USER")
         const boardCreate: Board = {
            id: nanoid(),
            background: { ...selectBg },
            columns: [],
            star: false,
            title: title,
            workspaceId: workspace,
            visibility: visibility,
         }
         const workspaceUpdate = workspaces?.find((w) => {
            return w.id === workspace
         })
         const boardsUpdate = workspaceUpdate?.boards?.push(boardCreate)
         await updateDoc(doc(db, "workspaces", workspace), {
            boards: boardsUpdate,
            ...workspaceUpdate,
         })
         getWorkspaces()
         router.push(`/boards/${workspace}/${boardCreate.id}`)
         return
      } catch (error) {}
   }

   // Function to get starred boards
   const getStarredBoards = () => {
      const newStarredBoards: Board[] = []
      workspaces.forEach((w) => {
         w.boards?.forEach((board: Board) => {
            if (board.star) {
               newStarredBoards.push({
                  id: board.id,
                  workspaceId: board.workspaceId,
                  title: board.title,
                  columns: [...board.columns],
                  star: board.star,
                  background: { ...board.background },
                  visibility: board.visibility,
               })
            }
         })
      })
      return newStarredBoards
   }

   // Function to get the current workspace
   const getWorkspace = () => {
      if (workspaces.length == 1) {
         if (workspaces[0].id != id) {
            router.push("/boards")
            return
         } else {
            return workspaces[0]
         }
      }
      const workspace = workspaces?.find((w) => w.id === id)
      return workspace
   }

   // Function to toggle star status of a board
   const changeStar = async (boardId: string, workspaceId: string) => {
      const workspaceUpdate = workspaces?.find((w) => {
         return w.id === workspaceId
      })
      const boardsUpdate: Board[] = []
      workspaceUpdate?.boards?.forEach((board) => {
         if (board.id === boardId) {
            boardsUpdate.push({ ...board, star: !board.star })
         } else {
            boardsUpdate.push(board)
         }
      })
      await updateDoc(doc(db, "workspaces", workspaceId), {
         ...workspaceUpdate,
         boards: boardsUpdate,
      })
      getWorkspaces()
   }

   // Function to delete the current workspace
   const deleteWorkspace = async () => {
      if (workspaces.length == 1) {
         alert(`Can't remove the last Workspace!`)
      } else {
         await deleteDoc(doc(db, "workspaces", id || ""))
         router.push("/boards")
         return
      }
   }

   return (
      <div>
         <Header
            addBoard={addBoard}
            starredBoards={getStarredBoards()}
            workspaces={workspaces}
         />
         <Workspace
            deleteWorkspace={deleteWorkspace}
            addBoard={addBoard}
            changeStar={changeStar}
            workspaces={workspaces}
            workspace={getWorkspace()}
         />
      </div>
   )
}
