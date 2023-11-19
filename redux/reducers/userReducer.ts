import { USER_LOGIN, USER_LOGOUT } from "../actions/userActions"

const initialState = null

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload
        case USER_LOGOUT:
            return null
        default:
            return state
    }
}