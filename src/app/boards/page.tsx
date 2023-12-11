"use client"

import { Board, WorkspaceType } from "@/types"
import {
   addDoc,
   collection,
   doc,
   getDocs,
   updateDoc,
} from "@firebase/firestore"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import AsyncStorage from "@react-native-async-storage/async-storage"
import Boards from "@/components/boards/Boards"
import Header from "@/components/header/Header"
import { db } from "@/firebase"
import { nanoid } from "nanoid"
import useWorkspaces from "@/hooks/workspace"

export default function BoardsPage() {
   const workspaceCollectionRef = collection(db, "workspaces")
   const router = useRouter()
   const id = usePathname().split("/").at(-1)

   const { workspaces, getWorkspaces, getStarredBoards } = useWorkspaces(
      id ?? ""
   )

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
      router.push(`/boards/${workspace}/${boardCreate.id}`)
   }

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

   return (
      <div>
         <Header
            addBoard={addBoard}
            starredBoards={getStarredBoards()}
            workspaces={workspaces}
         />
         <Boards
            changeStar={changeStar}
            addBoard={addBoard}
            workspaces={workspaces}
            starredBoards={getStarredBoards()}
         />
      </div>
   )
}
