import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const emergencySlice = createSlice({
  initialState,
  name: "emergency",
  reducers: {
    setEmergency: (state, action) => {
      const unresolvedEmergencies = [...action.payload].filter(
        (emergency) => emergency.status !== "Resolved"
      );
      state.push(...unresolvedEmergencies);
    },
    newEmergency: (state, action) => {
      state.push(action.payload);
    },
    updateEmergency: (state, action) => {
      if (action.payload.status === "Resolved") {
        // Return a new array excluding the resolved emergency
        return state.filter((emergency) => emergency._id !== action.payload.id);
      } else {
        // Directly update the status of the matching emergency
        state.forEach((emergency) => {
          if (emergency._id === action.payload.id) {
            emergency.status = action.payload.status;
          }
        });
      }
    },
  },
});

export const { setEmergency, newEmergency, updateEmergency } =
  emergencySlice.actions;

export default emergencySlice.reducer;
