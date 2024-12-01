import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ITUser = {
  id: "",
  full_name: "",
  first_name: "",
  last_name: "",
  email: ""
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    resetAuth: (state) => {
      return { ...state, ...initialState };
    },
  },
});

export const { updateAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
