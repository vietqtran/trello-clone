import { Board, CardType, ColumnType } from "@/types"
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { useCallback, useEffect, useState } from "react"

import { db } from "@/firebase"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import useWorkspaces from "./workspace"

function useBoard(boardId: string, workspaceId: string) {
   const [board, setBoard] = useState<Board | null>(null)
   const router = useRouter()
   const { workspaces, currentWorkspace } = useWorkspaces(workspaceId)

   const fetchBoard = useCallback(async () => {
      try {
         const workspace = workspaces.find((w) => w.id === workspaceId)
         const board = workspace?.boards?.find((b) => b.id === boardId)
         if (board) {
            setBoard(board)
         }
      } catch (error) {}
   }, [workspaces])

   useEffect(() => {
      fetchBoard()
   }, [fetchBoard])

   const addBoard = async (newBoardData: Board) => {
      const workspaceUpdate = workspaces?.find((w) => {
         return w.id === newBoardData.workspaceId
      })
      const boardsUpdate = workspaceUpdate?.boards?.push(newBoardData)
      await updateDoc(doc(db, "workspaces", workspaceUpdate?.id ?? ""), {
         boards: boardsUpdate,
         ...workspaceUpdate,
      })
      router.push(`/boards/${workspaceUpdate?.id ?? ""}/${newBoardData.id}`)
   }

   const updateBoard = async (columns: ColumnType[]) => {
      const newBoards: Board[] | undefined = currentWorkspace?.boards?.map(
         (b) => {
            if (b.id === board?.id) {
               return { ...b, columns: [...columns] }
            }
            return { ...b }
         }
      )
      await updateDoc(doc(db, "workspaces", currentWorkspace?.id ?? ""), {
         ...currentWorkspace,
         boards: newBoards,
      })
      fetchBoard()
   }

   const addColumn = async (name: string) => {
      const newColumn: ColumnType = {
         id: nanoid(),
         name: name,
         cards: [],
      }
      if (board) {
         const updatedColumns = [...board.columns, newColumn]
         await updateBoard(updatedColumns)
      }
   }

   const addCardToColumn = async (columnId: string, cardText: string) => {
      const newCard: CardType = {
         id: nanoid(),
         text: cardText,
         labels: [],
         image: {
            ntn: 0,
            type: "",
         },
         comments: [],
         description: "",
         fields: [],
      }

      if (board) {
         const updatedColumns = board.columns.map((column) =>
            column.id === columnId
               ? { ...column, cards: [...column.cards, newCard] }
               : column
         )
         await updateBoard(updatedColumns)
      }
   }

   const removeColumn = async (columnId: string) => {
      if (board) {
         const updatedColumns = board.columns.filter(
            (column) => column.id !== columnId
         )
         await updateBoard(updatedColumns)
      }
   }

   const removeCardFromColumn = async (columnId: string, cardId: string) => {
      if (board) {
         const updatedColumns = board.columns.map((column) =>
            column.id === columnId
               ? {
                    ...column,
                    cards: column.cards.filter((card) => card.id !== cardId),
                 }
               : column
         )
         await updateBoard(updatedColumns)
      }
   }

   return {
      board,
      addBoard,
      setBoard,
      fetchBoard,
      updateBoard,
      addColumn,
      addCardToColumn,
      removeColumn,
      removeCardFromColumn,
   }
}

export default useBoard
