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
  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [user, setUser] = useState<User>({
    id: '123',
    email: 'viet',
    password: '',
    recentBoard: [],
    auth: ''
  })
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem('USER')
      if (data) {
        setUser(JSON.parse(data))
      } else {
        // router.push('/')
      }
    }
    getUser()
  }, [])

  useEffect(() => {
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
    getWorkspaces()
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

  const changeStar = async (boardId: string, workspaceId: string) => {
    const workspaceUpdate = workspaces?.find((w) => {
      return w.id === workspaceId
    })
    const boardsUpdate: Board[] = []
    workspaceUpdate?.boards?.forEach((board) => {
      if (board.id === boardId) {
        boardsUpdate.push({ ...board, star: true })
      } else {
        boardsUpdate.push(board)
      }
    })
    await updateDoc(doc(db, 'workspaces', workspaceId), {
      boards: boardsUpdate,
      ...workspaceUpdate,
    })
    console.log('oke')
    console.log(boardId, workspaceId)
  }

  useEffect(() => {
    const getStarredBoards = async () => {
      const data = await AsyncStorage.getItem('USER')
      const userId = JSON.parse(data || '').id
      return await getDocs(workspaceCollectionRef).then((dataRef) => {
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
    getStarredBoards()
  }, [])

  return (
    <div>
      <Header addBoard={addBoard} starredBoards={starredBoards} workspaces={workspaces} />
      <Boards changeStar={changeStar} addBoard={addBoard} workspaces={workspaces} starredBoards={starredBoards} />
    </div>
  )
}
