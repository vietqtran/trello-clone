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
import { db } from "@/firebase"
import { nanoid } from "nanoid"
import useWorkspaces from "@/hooks/workspace"

export default function WorkspacePage() {
   // Extract the workspace ID from the URL path
   const id = usePathname().split("/").at(-1)

   // Firestore reference to the "workspaces" collection
   const workspaceCollectionRef = collection(db, "workspaces")

   const { workspaces, getWorkspaces, currentWorkspace, getStarredBoards } =
      useWorkspaces(id ?? "")

   // Next.js router
   const router = useRouter()

   // Function to add a new board
   const addBoard = async (
      selectBg: { ntn: number; type: string },
      title: string,
      workspace: string
   ) => {
      const boardCreate: Board = {
         id: nanoid(),
         background: { ...selectBg },
         columns: [],
         star: false,
         title: title,
         workspaceId: workspace,
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
            workspace={currentWorkspace}
         />
      </div>
   )
}
