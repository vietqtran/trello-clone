'use client'

import Boards from "@/components/boards/Boards";
import Header from "@/components/header/Header";
import { Board, User, WorkspaceType } from "@/types";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc } from '@firebase/firestore'
import { useEffect, useState } from "react"

export default function BoardsPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const [starredBoards, setStarredBoards] = useState<Board[]>([])

  const user: User = JSON.parse(localStorage.getItem('user') || '') || { id: '' }

  const workspaceCollectionRef = collection(db, "workspaces")

  useEffect(() => {
    getWorkspaces()
    console.log(workspaces)
  }, [workspaceCollectionRef])

  const getWorkspaces = async () => {
    await getDocs(workspaceCollectionRef).then((dataRef) => {
      const newWorkspaces: WorkspaceType[] = []
      dataRef.docs.forEach((doc) => {
        if (doc.data().userId === user.id) {
          newWorkspaces.push({
            id: doc.id,
            userId: String(doc.data().userId),
            name: String(doc.data().name),
            type: String(doc.data().type),
            boards: [...doc.data().boards],
            description: String(doc.data().description)
          })
        }
      })
      setWorkspaces(newWorkspaces)
    }).catch((err) => { })
  }
  const getStarredBoards = async () => {
    await getDocs(workspaceCollectionRef).then((dataRef) => {
      const newStarredBoards: Board[] = []
      dataRef.docs.forEach((doc) => {
        if (doc.data().userId === user.id) {
          doc.data().boards?.forEach((board: Board) => {
            if (board.star) {
              newStarredBoards.push({
                id: board.id,
                workspaceId: board.workspaceId,
                title: board.title,
                columns: [...board.columns],
                star: board.star,
                background: { ...board.background }
              })
            }
          })
        }
      })
      setStarredBoards(newStarredBoards)
    }).catch((err) => { })
  }
  console.log(workspaces)
  console.log(starredBoards)
  return (
    <div>
      <Header starredBoards={starredBoards} workspaces={workspaces} />
      <Boards workspaces={workspaces} starredBoards={starredBoards} />
    </div>
  )
}
