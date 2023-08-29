import { Board, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { value: { id: string, email: string, recentBoard: Board[] } } = {
   value: {
      id: '',
      email: '',
      recentBoard: []
   },
};

export const userReducer = createSlice({
   name: "user",
   initialState,
   reducers: {
      reset: () => initialState,
      setUser: (state, action: PayloadAction<User>) => {
         state.value = { ...action.payload }
      },
   },
});

export const {
   setUser,
   reset,
} = userReducer.actions;
export default userReducer.reducer;
