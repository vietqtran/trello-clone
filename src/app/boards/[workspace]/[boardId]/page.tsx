'use client'

import BoardContent from "@/components/boards/board/Board";
import HeaderBoard from "@/components/header/HeaderBoard";
import { usePathname, useRouter } from "next/navigation";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Board, User, WorkspaceType } from "@/types";
var uniqid = require('uniqid');

export default function BoardDetailPage() {
  const pathName = usePathname()
  const id = pathName.split('/').at(-1)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const router = useRouter()
  const [user, setUser] = useState<User>({
    id: '123',
    email: 'viet',
    password: '',
    recentBoard: [],
    auth: ''
  })

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
    router.push(`/boards/${workspace}/${boardCreate.id}`)
  }

  const workspace = workspaces?.find((w) => w.id == id)
  if (!workspace) {
    // router.push('/boards')
  }
  return (
      <div className={`max-w-[100vw] overflow-hidden flex flex-col items-center justify-start max-h-[100vh] min-h-[100vh] bg-[url('/assets/background/bg-image/bg3.jpg')] bg-center bg-cover`}>
      <HeaderBoard addBoard={addBoard} starredBoards={starredBoards} workspaces={workspaces} />
      <BoardContent workspace={workspace} boardId={pathName} />
    </div>
  )
}
