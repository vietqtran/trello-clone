import { User } from "@types"

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export const login = (user: User) => {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGIN,
        payload: null
    }
}