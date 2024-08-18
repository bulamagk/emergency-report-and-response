import { configureStore } from "@reduxjs/toolkit";
import clientAuthReducer from "../features/clientAuthSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    clientAuthReducer,
    auth: authSlice,
  },
});
