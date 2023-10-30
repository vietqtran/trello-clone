"use client"

import Search from "@/components/search/Search"
import Header from "@/components/header/Header"
import { Board, WorkspaceType } from "@/types"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore"
import { useRouter } from "next/navigation"
import { db } from "@/firebase"
import { nanoid } from "nanoid"

export default function SearchPage() {
   const router = useRouter()
   const [starredBoards, setStarredBoards] = useState<Board[]>([])
   const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
   const workspaceCollectionRef = collection(db, "workspaces")

   useEffect(() => {
      getWorkspaces()
   }, [])
   useEffect(() => {
      getStarredBoards()
   }, [])

   const getWorkspaces = async () => {
      try {
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data || "").id
         await getDocs(workspaceCollectionRef)
            .then((dataRef) => {
               const newWorkspaces: WorkspaceType[] = []
               dataRef.docs.forEach((doc) => {
                  if (doc.data().userId === userId) {
                     newWorkspaces.push({
                        id: doc.id,
                        userId: String(doc.data().userId),
                        name: String(doc.data().name),
                        type: String(doc.data().type),
                        boards: [...doc.data().boards],
                        description: String(doc.data().description),
                     })
                  }
               })
               setWorkspaces(newWorkspaces)
            })
            .catch((err) => {})
      } catch (error) {}
   }

   const getStarredBoards = async () => {
      try {
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data || "").id
         await getDocs(workspaceCollectionRef)
            .then((dataRef) => {
               const newStarredBoards: Board[] = []
               dataRef.docs.forEach((doc) => {
                  if (doc.data().userId === userId) {
                     doc.data().boards?.forEach((board: Board) => {
                        if (board.star) {
                           newStarredBoards.push({
                              id: board.id,
                              workspaceId: board.workspaceId,
                              title: board.title,
                              columns: [...board.columns],
                              star: board.star,
                              background: { ...board.background },
                              visibility: board.visibility,
                              members: [...board.members],
                           })
                        }
                     })
                  }
               })
               setStarredBoards(newStarredBoards)
            })
            .catch((err) => {})
      } catch (error) {}
   }

   const addBoard = async (
      selectBg: { ntn: number; type: string },
      title: string,
      workspace: string,
      visibility: string
   ) => {
      try {
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data || "").id
         const boardCreate: Board = {
            id: nanoid(),
            background: { ...selectBg },
            columns: [],
            star: false,
            title: title,
            workspaceId: workspace,
            visibility: visibility,
            members: [userId],
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

   return (
      <main>
         <Header
            addBoard={addBoard}
            starredBoards={starredBoards}
            workspaces={workspaces}
         />
         <Search workspaces={workspaces} />
      </main>
   )
}
