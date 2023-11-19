import { Board } from "@types"

export const BOARD_OPEN = 'BOARD_OPEN'
export const BOARD_CHANGE_STAR = 'BOARD_CHANGE_STAR'

export const openBoard = (board: Board) => {
    return {
        type: BOARD_OPEN,
        payload: board
    }
}

export const changeStar = (boardId: string, workspaceId: string) => {
    return {
        type: BOARD_CHANGE_STAR,
        payload: {
            boardId: boardId,
            workspaceId: workspaceId
        }
    }
}