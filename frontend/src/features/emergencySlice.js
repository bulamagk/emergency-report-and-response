import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const emergencySlice = createSlice({
  initialState,
  name: "emergency",
  reducers: {
    setEmergency: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setEmergency } = emergencySlice.actions;

export default emergencySlice.reducer;
