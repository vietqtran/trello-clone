import { Board, CardType, ColumnType } from "@/types"
import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { useCallback, useEffect, useState } from "react"

import { db } from "@/firebase"
import { nanoid } from "nanoid"
import { setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

function useBoard(boardId: string, workspaceId: string) {
   const [board, setBoard] = useState<Board | null>(null)
   const router = useRouter()

   const fetchBoard = useCallback(async () => {
      try {
         const boardDocRef = doc(
            db,
            "workspaces",
            workspaceId,
            "boards",
            boardId
         )
         const boardSnapshot = await getDoc(boardDocRef)

         if (boardSnapshot.exists()) {
            const data = boardSnapshot.data()
            setBoard({
               id: boardId,
               ...data,
            } as Board)
         }
      } catch (error) {}
   }, [boardId, workspaceId])

   useEffect(() => {
      if (boardId && workspaceId) {
         fetchBoard()
      }
   }, [boardId, workspaceId, fetchBoard])

   const addBoard = async (newBoardData: Board) => {
      try {
         const newBoardId = nanoid()
         const boardDocRef = doc(
            db,
            "workspaces",
            workspaceId,
            "boards",
            newBoardId
         )
         await setDoc(boardDocRef, newBoardData)
         router.push(`/boards/${workspaceId}/${newBoardId}`)
      } catch (error) {}
   }

   const updateBoard = async (columns: ColumnType[]) => {
      try {
         const boardDocRef = doc(
            db,
            "workspaces",
            workspaceId,
            "boards",
            boardId
         )
         await updateDoc(boardDocRef, { ...board, columns: columns })
         fetchBoard()
      } catch (error) {}
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
