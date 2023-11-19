import { BOARD_CHANGE_STAR, BOARD_OPEN } from "../actions/boardActions"

const initialState = null

export const boardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BOARD_OPEN: {
            return action.payload
        }
        case BOARD_CHANGE_STAR: {

        }
        default: {
            return state
        }
    }
}