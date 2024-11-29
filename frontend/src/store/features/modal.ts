import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    popUpModal: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { popUpModal } = modalSlice.actions;

export default modalSlice.reducer;
