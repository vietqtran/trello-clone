'use client'

import { User } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
   value: User
}

const initialState = {
   value: {
      id: '123',
      email: 'viet',
      password: '',
      recentBoard: [],
      auth: ''
   } as User
} as InitialState

export const userAuth = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: () => {
         return initialState
      },
      logIn: (state, action: PayloadAction<User>) => {
         return { value: action.payload }
      }
   }
})

export const { logOut, logIn } = userAuth.actions
export default userAuth.reducer