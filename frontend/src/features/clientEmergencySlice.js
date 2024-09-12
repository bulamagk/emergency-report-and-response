import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const emergencySlice = createSlice({
  initialState,
  name: "emergency",
  reducers: {
    setEmergency: (state, action) => {
      state.push(...action.payload);
    },
    newEmergency: (state, action) => {
      state.push(action.payload);
    },
    updateEmergency: (state, action) => {
      // Directly update the status of the matching emergency
      state.forEach((emergency) => {
        if (emergency._id === action.payload.id) {
          emergency.status = action.payload.status;
        }
      });
    },
  },
});

export const { setEmergency, newEmergency, updateEmergency } =
  emergencySlice.actions;

export default emergencySlice.reducer;
