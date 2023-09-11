'use client'

import Workspace from "@/components/boards/workspace/Workspace";
import Header from "@/components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Board, WorkspaceType } from "@/types";
var uniqid = require('uniqid');

export default function WorkspacePage() {

  const id = usePathname().split('/').at(-1)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const user = JSON.parse(localStorage.getItem('user') || '')
  const router = useRouter()

  useEffect(() => {
    getWorkspaces()
    console.log(workspaces)
  }, [])

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

  const addBoard = async (selectBg: { ntn: number, type: string }, title: string, workspace: string) => {
    const boardCreate: Board = {
      id: uniqid(),
      background: { ...selectBg },
      columns: [],
      star: false,
      title: title,
      workspaceId: workspace
    }

    const workspaceUpdate = workspaces?.find((w) => {
      return w.id === workspace
    })
    const boardsUpdate = workspaceUpdate?.boards?.push(boardCreate)
    await updateDoc(doc(db, 'workspaces', workspace), {
      boards: boardsUpdate,
      ...workspaceUpdate,
    })
    // router.push(`/boards/${workspace}/${boardCreate.id}`)
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
  const workspace = workspaces?.find((w) => w.id == id)

  return (
    <div>
      <Header addBoard={addBoard} starredBoards={starredBoards} workspaces={workspaces} />
      <Workspace workspaces={workspaces} workspace={workspace} />
    </div>
  )
}
