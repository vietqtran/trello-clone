"use client"

import { Board, WorkspaceType } from "@/types"
import { doc, updateDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"

import Boards from "@/components/boards/Boards"
import Header from "@/components/header/Header"
import ReduxWrapper from "@components/ReduxWrapper"
import { RootState } from "../../../redux/reducers"
import { db } from "../../../utils/firebase"
import { useSelector } from "react-redux"

export default function BoardsPage() {
   const workspaces: WorkspaceType[] = useSelector(
      (state: RootState) => state.workspaces as WorkspaceType[]
   )

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
      <ReduxWrapper>
         <div>
            <Header />
            <Boards changeStar={changeStar} />
         </div>
      </ReduxWrapper>
   )
}
