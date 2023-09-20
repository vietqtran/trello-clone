'use client'

import Workspace from "@/components/boards/workspace/Workspace";
import Header from "@/components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Board, User, WorkspaceType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
var uniqid = require('uniqid');

export default function WorkspacePage() {

  const id = usePathname().split('/').at(-1)
  console.log(id)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const router = useRouter()

  useEffect(() => {
    getWorkspaces()
    console.log(workspaces)
  }, [])
  useEffect(() => {
    getStarredBoards()
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
    getWorkspaces()
    router.push(`/boards/${workspace}/${boardCreate.id}`)
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

  const getWorkspace = () => {
    if (workspaces.length == 1) {
      if (workspaces[0].id != id) {
        router.push('/boards')
      } else {
        return workspaces[0]
      }
    }
    const workspace = workspaces?.find((w) => w.id === id)
    console.log(workspace)
    return workspace
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

  const deleteWorkspace = async () => {
    await deleteDoc(doc(db, "workspaces", id || ''))
    router.push('/boards')
  }

  return (
    <div>
      <Header addBoard={addBoard} starredBoards={getStarredBoards()} workspaces={workspaces} />
      <Workspace deleteWorkspace={deleteWorkspace} addBoard={addBoard} changeStar={changeStar} workspaces={workspaces} workspace={getWorkspace()} />
    </div>
  )
}
