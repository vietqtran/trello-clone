'use client'

import Boards from "@/components/boards/Boards";
import Header from "@/components/header/Header";
import { Board, User, WorkspaceType } from "@/types";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/navigation";
var uniqid = require('uniqid');

export default function BoardsPage() {
  const workspaceCollectionRef = collection(db, "workspaces")
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const router = useRouter()

  useEffect(() => {
    getWorkspaces()
  }, [])
  const getWorkspaces = async () => {
    const data = await AsyncStorage.getItem('USER')
    const userId = JSON.parse(data || '').id
    await getDocs(workspaceCollectionRef).then((dataRef) => {
      const newWorkspaces: WorkspaceType[] = []
      dataRef.docs.forEach((doc) => {
        if (doc.data().userId === userId) {
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
    await updateDoc(doc(db, 'workspaces', workspaceId), {
      ...workspaceUpdate,
      boards: boardsUpdate,
    })
    getWorkspaces()
  }

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
            background: { ...board.background }
          })
        }
      })
    })
    return newStarredBoards
  }
console.log(workspaces)
  return (
    <div>
      <Header addBoard={addBoard} starredBoards={getStarredBoards()} workspaces={workspaces} />
      <Boards changeStar={changeStar} addBoard={addBoard} workspaces={workspaces} starredBoards={getStarredBoards()} />
    </div>
  )
}
