"use client"
import React, { useEffect, useState } from "react"
import BoardContent from "@/components/boards/board/Board"
import HeaderBoard from "@/components/header/HeaderBoard"
import { usePathname, useRouter } from "next/navigation"
import { db } from "@/firebase"
import { collection, getDocs, doc, updateDoc } from "@firebase/firestore"
import { Board, ColumnType, WorkspaceType } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Image from "next/image"
var uniqid = require("uniqid")

export default function BoardDetailPage() {
   const pathName = usePathname()
   const id = pathName.split("/").at(-1)
   const workspaceId = pathName.split("/").at(-2)
   const workspaceCollectionRef = collection(db, "workspaces")
   const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
   const [board, setBoard] = useState<Board>()
   const router = useRouter()

   useEffect(() => {
      getWorkspaces()
   }, [])

   useEffect(() => {
      getBoard()
   }, [workspaces])

   const getWorkspaces = async () => {
      try {
         // Get the user's data from AsyncStorage
         const data = await AsyncStorage.getItem("USER")
         const userId = JSON.parse(data || "").id

         // Fetch workspaces from Firestore and filter by userId
         await getDocs(workspaceCollectionRef)
            .then((dataRef) => {
               const newWorkspaces: WorkspaceType[] = []
               dataRef.docs.forEach((doc) => {
                  if (doc.data().userId === userId) {
                     newWorkspaces.push({
                        id: doc.id,
                        userId: String(doc.data().userId),
                        name: String(doc.data().name),
                        type: String(doc.data().type),
                        boards: [...doc.data().boards],
                        description: String(doc.data().description),
                     })
                  }
               })
               setWorkspaces(newWorkspaces)
            })
            .catch((err) => {})
      } catch (error) {}
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
                  background: { ...board.background },
               })
            }
         })
      })
      return newStarredBoards
   }

   const getBoard = () => {
      workspaces.forEach((w) => {
         if (w.id === workspaceId) {
            const newBoard = w.boards?.find((b) => b.id === id)
            if (!newBoard) {
               router.push("/boards")
            }
            setBoard(newBoard)
            return
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
      await updateDoc(doc(db, "workspaces", workspaceId), {
         ...workspaceUpdate,
         boards: boardsUpdate,
      })
      getWorkspaces()
   }

   const addBoard = async (
      selectBg: { ntn: number; type: string },
      title: string,
      workspace: string
   ) => {
      const boardCreate: Board = {
         id: uniqid(),
         background: { ...selectBg },
         columns: [],
         star: false,
         title: title,
         workspaceId: workspace,
      }
      const workspaceUpdate = workspaces?.find((w) => {
         return w.id === workspace
      })
      const boardsUpdate = workspaceUpdate?.boards?.push(boardCreate)
      await updateDoc(doc(db, "workspaces", workspace), {
         boards: boardsUpdate,
         ...workspaceUpdate,
      })
      router.push(`/boards/${workspace}/${boardCreate.id}`)
   }

   const getWorkspace = (id: string) => {
      return workspaces.find((w) => w.id === id)
   }

   const renameBoard = async (newName: string) => {
      const workspace = getWorkspace(workspaceId || "")
      const newBoards: Board[] | undefined = workspace?.boards?.map((b) => {
         if (b.id === id) {
            return { ...b, title: newName }
         }
         return b
      })
      await updateDoc(doc(db, "workspaces", workspace?.id || ""), {
         ...workspace,
         boards: newBoards,
      })
      getWorkspaces()
   }

   const reSetBoard = async (columns: ColumnType[]) => {
      const workspace = getWorkspace(workspaceId || "")
      const newBoards: Board[] | undefined = workspace?.boards?.map((b) => {
         if (b.id === id) {
            return { ...b, columns: [...columns] }
         }
         return b
      })
      await updateDoc(doc(db, "workspaces", workspace?.id || ""), {
         ...workspace,
         boards: newBoards,
      })
      getWorkspaces()
   }

   const deleteColumn = (id: string) => {
      const newList = board?.columns.filter((col) => {
         return col.id !== id
      })
      reSetBoard(newList || [])
   }

   const updateColumn = async (column: ColumnType) => {
      const workspace = getWorkspace(workspaceId || "")
      const newBoards: Board[] | undefined = workspace?.boards?.map((b) => {
         if (b.id === id) {
            const newColumns = b.columns.map((c) => {
               if (c.id === column.id) {
                  return column
               }
               return c
            })
            return { ...b, columns: [...newColumns] }
         }
         return b
      })
      await updateDoc(doc(db, "workspaces", workspace?.id || ""), {
         ...workspace,
         boards: newBoards,
      })
      getWorkspaces()
   }

   const moveColumn = async (
      receiveWorkspaceId: string,
      receiveBoardId: string,
      receiveIndex: number,
      column: ColumnType,
      idDelete: string
   ) => {
      const receiveWorkspace: WorkspaceType = workspaces.find(
         (w) => w.id === receiveWorkspaceId
      ) || {
         id: "",
         userId: "",
         name: "",
         boards: [],
         type: "",
         description: "",
      }
      const receiveBoard: Board = receiveWorkspace.boards?.find(
         (b) => b.id === receiveBoardId
      ) || {
         id: "",
         workspaceId: "",
         title: "",
         columns: [],
         star: false,
         background: {
            ntn: 0,
            type: "",
         },
      }
      const columns: ColumnType[] = [...receiveBoard.columns]
      let newColumns: ColumnType[] = []
      if (columns.length == 0) {
         newColumns.push(column)
      } else if (receiveIndex === columns.length) {
         newColumns = [...columns, column]
      } else {
         columns.forEach((c, index) => {
            if (index === receiveIndex) {
               newColumns.push(column)
            }
            newColumns.push(c)
         })
      }
      const newBoard = { ...receiveBoard, columns: newColumns }
      const newBoards = receiveWorkspace.boards?.map((b) => {
         if (b.id === newBoard.id) {
            return newBoard
         }
         return b
      })
      receiveWorkspace.boards = newBoards
      await updateDoc(
         doc(db, "workspaces", receiveWorkspaceId),
         receiveWorkspace
      )
      deleteColumn(idDelete)
   }

   // TODO move with same board
   return (
      <div
         className={`relative max-w-[100vw] overflow-hidden flex flex-col items-center justify-start max-h-[100vh] min-h-[100vh]`}
      >
         {board && (
            <>
               {/* Background Image */}
               <div className='w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black z-[-1]'>
                  <Image
                     width={2000}
                     height={2000}
                     src={`/assets/background/bg-${board?.background?.type}/bg${board?.background?.ntn}.jpg`}
                     alt='bg'
                     className='w-full h-full object-cover'
                  />
               </div>
               {/* Header and Board Content */}
               <HeaderBoard
                  addBoard={addBoard}
                  starredBoards={getStarredBoards()}
                  workspaces={workspaces}
               />
               <BoardContent
                  moveColumn={moveColumn}
                  updateColumn={updateColumn}
                  reSetBoard={reSetBoard}
                  renameBoard={renameBoard}
                  getWorkspaces={getWorkspaces}
                  starBoard={starBoard}
                  board={board}
                  workspaces={workspaces}
                  boardId={pathName}
                  workspace={getWorkspace(board.workspaceId)}
               />
            </>
         )}
      </div>
   )
}
