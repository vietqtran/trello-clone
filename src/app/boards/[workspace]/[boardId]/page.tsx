'use client'

import BoardContent from "@/components/boards/board/Board";
import HeaderBoard from "@/components/header/HeaderBoard";
import { usePathname, useRouter } from "next/navigation";
import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { Board, User, WorkspaceType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Image from "next/image";
var uniqid = require('uniqid');

export default function BoardDetailPage() {
  const pathName = usePathname()
  const id = pathName.split('/').at(-1)
  const workspaceId = pathName.split('/').at(-2)
  const workspaceCollectionRef = collection(db, "workspaces")
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const [board, setBoard] = useState<Board>()
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

  useEffect(() => {
    getBoard()
  }, [workspaces])

  const getBoard = () => {
    workspaces.forEach((w) => {
      if (w.id === workspaceId) {
        const newBoard=  w.boards?.find((b) => b.id === id)
        setBoard(newBoard)
      }
    })
  }

  const starBoard = async (boardId: string, workspaceId: string) => {
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
    console.log(workspaceUpdate)
    await updateDoc(doc(db, 'workspaces', workspaceId), {
      ...workspaceUpdate,
      boards: boardsUpdate,
    })
    getWorkspaces()
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

  const reSetWorkspace = async (newWorkspace: any) => {
    await updateDoc(doc(db, 'workspaces', newWorkspace.id), newWorkspace)
 }

 const renameBoard = (newName: string) => {
    // const newBoards: Board[] | undefined = workspace?.boards?.map((b) => {
    //    if (b.id === props.board?.id) {
    //       return { ...b, title: newName }
    //    }
    //    return b
    // })
    // const newWorkspace = { ...workspace, boards: [...newBoards || []] }
    // console.log(newBoards)
    // reSetWorkspace(newWorkspace)
    // props.getWorkspaces()
 }

  return (
    <div className={`relative max-w-[100vw] overflow-hidden flex flex-col items-center justify-start max-h-[100vh] min-h-[100vh]`}>
      <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black z-[-1]">
        <Image width={2000} height={2000} src={`/assets/background/bg-${board?.background.type}/bg${board?.background.ntn}.jpg`} alt="bg" className="w-full h-full object-cover" />
      </div>
      <HeaderBoard addBoard={addBoard} starredBoards={getStarredBoards()} workspaces={workspaces} />
      <BoardContent renameBoard={renameBoard} getWorkspaces={getWorkspaces} starBoard={starBoard} board={board} workspaces={workspaces} boardId={pathName} />
    </div>
  )
}
