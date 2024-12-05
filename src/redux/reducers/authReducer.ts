import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  code: 0,
  message: "",
  data: "",
};

export interface AuthTypeState {
  code: number;
  message: string;
  data: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.authReducer.data;
