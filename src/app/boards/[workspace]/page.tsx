'use client'

import Workspace from "@/components/boards/workspace/Workspace";
import Header from "@/components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs } from '@firebase/firestore'
import { db } from "@/firebase";
import { useEffect, useState } from 'react'
import { Board, WorkspaceType } from "@/types";
import { useAppSelector } from "@/app/redux/store";

export default function WorkspacePage() {

  const id = usePathname().split('/').at(-1)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const user = useAppSelector((state) => state.userReducer.value)
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
      <Header starredBoards={starredBoards} workspaces={workspaces} />
      <Workspace workspaces={workspaces} workspace={workspace} />
    </div>
  )
}
