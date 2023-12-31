"use client"
import React, { useEffect, useState } from "react"
import BoardContent from "@/components/boards/board/Board"
import HeaderBoard from "@/components/header/HeaderBoard"
import { usePathname, useRouter } from "next/navigation"
import { db } from "@/firebase"
import { collection, getDocs, doc, updateDoc } from "@firebase/firestore"
import { Board, CardType, ColumnType, WorkspaceType } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Image from "next/image"
import { nanoid } from "nanoid"

export default function BoardDetailPage() {
   const pathName = usePathname()
   const id = pathName.split("/").at(-1)
   const workspaceId = pathName.split("/").at(-2)
   const workspaceCollectionRef = collection(db, "workspaces")
   const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
   // Xác đinh xem là thao tác với 1 workspace duy nhất hay không, nếu thao tác với 1 workspace duy nhất thì nên tạo thêm 1 biến mới và truyền xuống
   // const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceType>()
   const [board, setBoard] = useState<Board>()
   const router = useRouter()

   useEffect(() => {
      getWorkspaces()
   }, [])

   useEffect(() => {
      getBoard()
   }, [workspaces])

   // hàm này dùng đi dùng lại khá nhiều lần, nên export ra và gọi vào các file cần dùng, như thế để tránh việc phải viết lại nhiều lần.
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

   const getWorkspace = (id: string) => {
      return workspaces.find((w) => w.id === id)
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

   const addBoard = async (
      selectBg: { ntn: number; type: string },
      title: string,
      workspace: string
   ) => {
      const boardCreate: Board = {
         id: nanoid(),
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
      // Xem xet có viết lại được kiểu tổng quát không, nếu có thì nên viết lại, export ra để sử dụng ở nhiều chỗ
      await updateDoc(doc(db, "workspaces", workspace), {
         boards: boardsUpdate,
         ...workspaceUpdate,
      })
      router.push(`/boards/${workspace}/${boardCreate.id}`)
   }

   //Thay sử dụng hàm updateBoard để update lại board
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
   //Thay sử dụng hàm updateBoard để update lại board
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
   //Thay sử dụng hàm updateBoard để update lại board
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
   //Thay sử dụng hàm updateBoard để update lại board
   const deleteColumn = (id: string) => {
      const newList = board?.columns.filter((col) => {
         return col.id !== id
      })
      reSetBoard(newList || [])
      getWorkspaces()
   }

   //Thay sử dụng hàm updateBoard để update lại board
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
      } // define 1 biến defaultColumn để dùng ko phải viết lại nhiều lần
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
      // Có thể sử dụng hàm splice
      // if(columns.length === 0 || columns.length === receiveIndex) {
      //    newColumns.push(column)
      // } else {
      //    newColumns.splice(receiveIndex, 0, column);
      // }
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
               {/* Xem xem xét chỉ truyền xuống những props thực sự cần thiết thôi, tránh việc truyền quá sâu các props không cần thiết */}
               {/* VD: currentWorkspace, getWorkspace*/}
               <BoardContent
                  moveColumn={moveColumn} 
                  updateColumn={updateColumn} // sau khi đã viết fuction dùng chung thì tạo ra 1 hook trong thư mục board, dùng fuction chung đã viết để xử lý luôn ở component cuối cùng
                  reSetBoard={reSetBoard} // tương tự update
                  renameBoard={renameBoard} // tương tự update
                  getWorkspaces={getWorkspaces}
                  starBoard={starBoard}// tương tự update
                  board={board} //Xem xét xem có xử lý ở 1 board duy nhất ko? nếu có thì truyền
                  workspaces={workspaces} //xem xét xem có thực sự cần truyền phần này xuống ko?
                  boardId={pathName}
                  workspace={getWorkspace(board.workspaceId)} // thay thế bằng currentWorkspace
                  moveCardBetweenWorkspaces={moveCardBetweenWorkspaces}
                  moveCardWithinWorkspace={moveCardWithinWorkspace}
                  moveCardWithinBoard={moveCardWithinBoard}
               />
            </>
         )}
      </div>
   )
}
