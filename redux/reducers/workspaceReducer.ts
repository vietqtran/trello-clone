import { WORKSPACE_GETALL } from "../actions/workspaceActions"

const initialState = null

export const workspaceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WORKSPACE_GETALL:
            return action.payload
        default:
            return state
    }
}