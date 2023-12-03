// @/hooks/useWorkspaces.ts

import { Board, WorkspaceType } from "@/types"
import { collection, getDocs, query, where } from "@firebase/firestore"
import { useCallback, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { db } from "@/firebase"

const useWorkspaces = (workspaceId: string) => {
   const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
   const [currentWorkspace, setCurrentWorkspace] =
      useState<WorkspaceType | null>(null)

   const getWorkspaces = useCallback(async () => {
      try {
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data ?? "{}").id

         if (userId) {
            const workspaceCollectionRef = collection(db, "workspaces")
            const q = query(
               workspaceCollectionRef,
               where("userId", "==", userId)
            )
            const querySnapshot = await getDocs(q)

            const newWorkspaces: WorkspaceType[] = querySnapshot.docs.map(
               (doc) => ({
                  ...(doc.data() as WorkspaceType),
                  id: doc.id,
               })
            )

            setWorkspaces(newWorkspaces)
            setCurrentWorkspace(
               newWorkspaces.find((w) => w.id === workspaceId) ?? null
            )
         }
      } catch (error) {
         console.log(error)
      }
   }, [workspaceId])

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
               })
            }
         })
      })
      return newStarredBoards
   }

   useEffect(() => {
      getWorkspaces()
   }, [getWorkspaces])

   return { workspaces, getWorkspaces, currentWorkspace, getStarredBoards }
}

export default useWorkspaces
