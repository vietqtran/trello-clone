'use client'

import BoardContent from "@/components/boards/board/Board";
import HeaderBoard from "@/components/header/HeaderBoard";
import { usePathname, useRouter } from "next/navigation";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Board, User, WorkspaceType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
var uniqid = require('uniqid');

export default function BoardDetailPage() {
  const pathName = usePathname()
  const id = pathName.split('/').at(-1)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const [board, setBoard] = useState<Board>()
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

  const getStarredBoards = async () => {
    const data = await AsyncStorage.getItem('USER')
    const userId = JSON.parse(data || '').id
    await getDocs(workspaceCollectionRef).then((dataRef) => {
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
                background: { ...board.background }
              })
            }
          })
        }
      })
      setStarredBoards(newStarredBoards)
    }).catch((err) => { })
  }
  useEffect(() => {
    const getBoard = async () => {
      const data = await AsyncStorage.getItem('USER')
      const userId = JSON.parse(data || '').id
      await getDocs(workspaceCollectionRef).then((dataRef) => {
        dataRef.docs.forEach((doc) => {
          if (doc.data().userId === userId) {
            doc.data().boards?.forEach((board: Board) => {
              if (board.id === id) {
                setBoard({
                  id: board.id,
                  workspaceId: board.workspaceId,
                  title: board.title,
                  columns: [...board.columns],
                  star: board.star,
                  background: { ...board.background }
                })
                return
              }
            })
          }
        })
      }).catch((err) => { })
    }
    getBoard()
  }, [])   

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

  return (
    <div className={`max-w-[100vw] overflow-hidden flex flex-col items-center justify-start max-h-[100vh] min-h-[100vh] bg-[url('/assets/background/bg-image/bg5.jpg')] bg-center bg-cover`}>
      <HeaderBoard board={board} addBoard={addBoard} starredBoards={starredBoards} workspaces={workspaces} />
      <BoardContent board={board} workspaces={workspaces} boardId={pathName} />
    </div>
  )
}
