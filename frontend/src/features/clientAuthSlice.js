import { createSlice } from "@reduxjs/toolkit";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("clientUser"));
const initialState = {
  user: user ?? null,
};

const clientUserSlice = createSlice({
  name: "clientUser",
  initialState,
  reducers: {
    login: (state, action) => {
      // Set user in application state
      state.user = action.payload;

      // Save user in local storage
      console.log(action.payload);
      localStorage.setItem("clientUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("clientUser");
    },
  },
});

export const { login, logout } = clientUserSlice.actions;

export default clientUserSlice.reducer;
