import { Board, ColumnType, WorkspaceType } from "@/types"
import { doc, updateDoc } from "firebase/firestore"

import { db } from "@/firebase"
import { getWorkspaces } from "./workspace"
import { nanoid } from "nanoid"

// File này để viết những cái tổng quát như này

//Đây chỉ là ví dụ demo, có thể thay thế và viết lại để hàm tổng quát hơn.
export const updateBoard = async ({
   workspace,
   boardId,
   title,
   columns,
   star,
}: {
   workspace: WorkspaceType
   boardId: string
   title?: string
   columns?: ColumnType[]
   star?: boolean
}) => {
   const newBoards: Board[] | undefined = workspace?.boards?.map((board) => {
      if (board.id === boardId) {
         return {
            ...board,
            title: title || board.title,
            columns: columns || board.columns,
            star: star || board.star,
         }
      }
      return board
   })

   //Có thể viết thêm 1 hàm updatedoc tương tự như cách viết hàm update brand vì thấy khá nhiều chỗ đang sử dụng hàm này.
   await updateDoc(doc(db, "workspaces", workspace?.id || ""), {
      ...workspace,
      boards: newBoards,
   })
}

export const addBoardAsync = async (
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
   const workspaces = await getWorkspaces().then((res) => res)
   const workspaceUpdate = workspaces?.find((w) => {
      return w.id === workspace
   })
   const boardsUpdate = workspaceUpdate?.boards?.push(boardCreate)
   // Xem xet có viết lại được kiểu tổng quát không, nếu có thì nên viết lại, export ra để sử dụng ở nhiều chỗ
   await updateDoc(doc(db, "workspaces", workspace), {
      boards: boardsUpdate,
      ...workspaceUpdate,
   })
   return boardCreate
}
