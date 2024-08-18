import { createSlice } from "@reduxjs/toolkit";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Set user in application state
      state.user = action.payload;

      // Save user in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
