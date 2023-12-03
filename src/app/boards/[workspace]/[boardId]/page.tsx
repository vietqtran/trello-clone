"use client"

import { Board, CardType, ColumnType, WorkspaceType } from "@/types"
import { doc, updateDoc } from "firebase/firestore"

import BoardContent from "@/components/boards/board/Board"
import HeaderBoard from "@/components/header/HeaderBoard"
import Image from "next/image"
import { db } from "@/firebase"
import { nanoid } from "nanoid"
import useBoard from "@/hooks/board"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import useWorkspaces from "@/hooks/workspace"

export default function BoardDetailPage() {
   const pathName = usePathname()
   const id = pathName.split("/").at(-1)
   const workspaceId = pathName.split("/").at(-2)

   const { board, fetchBoard } = useBoard(id as string, workspaceId ?? "")

   const { workspaces, getWorkspaces, currentWorkspace, getStarredBoards } =
      useWorkspaces(workspaceId ?? "")

   useEffect(() => {
      getWorkspaces()
   }, [getWorkspaces])

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

   const getWorkspace = (id: string) => {
      return workspaces.find((w) => w.id === id)
   }

   const updateBoard = async (columns: ColumnType[]) => {
      try {
         const workspace = getWorkspace(workspaceId ?? "")
         if (workspace) {
            await updateDoc(doc(db, "workspaces", workspace.id), {
               ...workspace,
               board: { ...workspace.boards, columns: columns },
            })
            fetchBoard()
         }
      } catch (error) {
         console.error("Error updating board:", error)
      }
   }

   const renameBoard = async (newName: string) => {
      const workspace = getWorkspace(workspaceId ?? "")
      const newBoards: Board[] | undefined = workspace?.boards?.map((b) => {
         if (b.id === id) {
            return { ...b, title: newName }
         }
         return b
      })
      await updateDoc(doc(db, "workspaces", workspace?.id ?? ""), {
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
      if (workspace) {
         const workspaceDocRef = doc(db, "workspaces", workspace.id)
         await updateDoc(workspaceDocRef, {
            ...workspace,
            boards: newBoards,
         })
         await updateBoard(columns)
      }
   }

   const deleteColumn = (id: string) => {
      const newList = board?.columns.filter((col) => {
         return col.id !== id
      })
      reSetBoard(newList || [])
      getWorkspaces()
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
      if (columns.length === 0 || columns.length === receiveIndex) {
         newColumns.push(column)
      } else {
         newColumns.splice(receiveIndex, 0, column)
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

   const moveCardBetweenWorkspaces = (
      destinationBoard: Board,
      destinationColumn: ColumnType,
      card: CardType,
      index: number,
      sourceColumn: ColumnType,
      sourceBoard: Board
   ) => {
      const sourceWorkspace = workspaces.find((w) => w.id === workspaceId)
      const newSourceCards = sourceColumn.cards.filter((c) => {
         return c.id !== card.id
      })
      const newSourceColumns = sourceBoard.columns.map((c) => {
         if (c.id === sourceColumn.id) {
            return { ...c, cards: newSourceCards }
         }
         return c
      })
      const newSourceBoards = sourceWorkspace?.boards?.map((b) => {
         if (b.id === sourceBoard.id) {
            return { ...sourceBoard, columns: newSourceColumns }
         } else {
            return b
         }
      })

      const destinationWorkspace = workspaces.find(
         (w) => w.id === destinationBoard.workspaceId
      )
      const newDestinationCards: CardType[] = [...destinationColumn.cards]
      newDestinationCards.splice(index, 0, { ...card, id: nanoid() })
      const newColumn: ColumnType = {
         ...destinationColumn,
         cards: newDestinationCards,
      }
      const newColumns: ColumnType[] = destinationBoard.columns.map((c) => {
         if (c.id === newColumn.id) {
            return newColumn
         }
         return c
      })
      const newBoard: Board = { ...destinationBoard, columns: newColumns }
      const newBoards: Board[] = (destinationWorkspace?.boards || []).map(
         (b) => {
            if (b.id === newBoard.id) {
               return newBoard
            }
            return b
         }
      )
      const update = async () => {
         const updateSourceWorkspacePromise = updateDoc(
            doc(db, "workspaces", sourceBoard.workspaceId),
            {
               ...sourceWorkspace,
               boards: newSourceBoards,
            }
         )
         const updateDestinationWorkspacePromise = updateDoc(
            doc(db, "workspaces", destinationBoard.workspaceId),
            {
               ...destinationWorkspace,
               boards: newBoards,
            }
         )
         await Promise.all([
            updateSourceWorkspacePromise,
            updateDestinationWorkspacePromise,
         ])
      }
      update()
      getWorkspaces()
   }

   const moveCardWithinWorkspace = async (
      workspace: WorkspaceType,
      sourceBoard: Board,
      destinationBoard: Board,
      sourceColumn: ColumnType,
      destinationColumn: ColumnType,
      card: CardType,
      index: number
   ) => {
      const cardToMove = sourceColumn.cards.find((c) => c.id === card.id)
      if (!cardToMove) {
         return
      }
      const newSourceColumn: ColumnType = {
         ...sourceColumn,
         cards: sourceColumn.cards.filter((c) => c.id !== card.id),
      }
      const newDestinationColumn: ColumnType = {
         ...destinationColumn,
         cards: [
            ...destinationColumn.cards.slice(0, index),
            { ...cardToMove },
            ...destinationColumn.cards.slice(index),
         ],
      }
      const updatedSourceBoard: Board = {
         ...sourceBoard,
         columns: sourceBoard.columns.map((column) =>
            column.id === newSourceColumn.id ? newSourceColumn : column
         ),
      }
      const updatedDestinationBoard: Board = {
         ...destinationBoard,
         columns: destinationBoard.columns.map((column) =>
            column.id === newDestinationColumn.id
               ? newDestinationColumn
               : column
         ),
      }
      const updatedBoards: Board[] =
         workspace.boards?.map((board) =>
            board.id === updatedSourceBoard.id
               ? updatedSourceBoard
               : board.id === updatedDestinationBoard.id
               ? updatedDestinationBoard
               : board
         ) || []
      const updatedWorkspace: WorkspaceType = {
         ...workspace,
         boards: updatedBoards,
      }
      await updateDoc(
         doc(db, "workspaces", updatedWorkspace.id),
         updatedWorkspace
      )
      getWorkspaces()
   }

   const moveCardWithinBoard = (
      board: Board,
      sourceColumn: ColumnType,
      destinationColumn: ColumnType,
      card: CardType,
      index: number
   ) => {
      const newSourceColumn: ColumnType = {
         ...sourceColumn,
         cards: sourceColumn.cards.filter((c) => c.id !== card.id),
      }

      const newCards: CardType[] = []
      destinationColumn.cards.forEach((c, i) => {
         if (i === index) {
            newCards.push({ ...card, id: nanoid() })
         }
         newCards.push(c)
      })

      const newDestinationColumn: ColumnType = {
         ...destinationColumn,
         cards: [...newCards],
      }

      const updatedColumns: ColumnType[] = board.columns.map((column) =>
         column.id === newSourceColumn.id
            ? newSourceColumn
            : column.id === newDestinationColumn.id
            ? newDestinationColumn
            : column
      )
      reSetBoard(updatedColumns)
   }
   return (
      <div
         className={`relative flex max-h-[100vh] min-h-[100vh] max-w-[100vw] flex-col items-center justify-start overflow-hidden`}
      >
         {board && (
            <>
               {/* Background Image */}
               <BackgroundImage board={board} />
               {/* Header and Board Content */}
               <HeaderBoard
                  starredBoards={getStarredBoards()}
                  workspaces={workspaces}
               />
               <BoardContent
                  starBoard={starBoard}
                  renameBoard={renameBoard}
                  reSetBoard={reSetBoard}
                  moveColumn={moveColumn}
                  moveCardBetweenWorkspaces={moveCardBetweenWorkspaces}
                  moveCardWithinWorkspace={moveCardWithinWorkspace}
                  moveCardWithinBoard={moveCardWithinBoard}
                  board={board}
                  workspace={currentWorkspace}
                  boardId={id ?? ""}
                  getWorkspaces={getWorkspaces}
                  updateColumn={updateColumn}
                  workspaces={workspaces}
               />
            </>
         )}
      </div>
   )
}

function BackgroundImage({ board }: { board: Board }) {
   return (
      <div className='absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full bg-black'>
         <Image
            width={2000}
            height={2000}
            src={`/assets/background/bg-${board?.background?.type}/bg${board?.background?.ntn}.jpg`}
            alt='bg'
            className='h-full w-full object-cover'
         />
      </div>
   )
}
