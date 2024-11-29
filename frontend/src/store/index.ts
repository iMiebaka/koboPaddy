import { configureStore } from "@reduxjs/toolkit";
import popUpModal from "./features/modal";
import auth from "./features/auth";
import counter from "./features/counter";
export const store = configureStore({
  reducer: {
    auth,
    popUpModal,
    counter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
