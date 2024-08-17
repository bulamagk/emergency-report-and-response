import { configureStore } from "@reduxjs/toolkit";
import clientAuthReducer from "../features/clientAuthSlice";

export const store = configureStore({
  reducer: {
    clientAuthReducer,
  },
});
