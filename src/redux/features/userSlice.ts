import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
   value: {
      id: '',
      email: '',
      password: '',
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
