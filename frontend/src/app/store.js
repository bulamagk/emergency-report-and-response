import { configureStore } from "@reduxjs/toolkit";
import clientAuthReducer from "../features/clientAuthSlice";
import authSlice from "../features/authSlice";
import emergencySlice from "../features/emergencySlice";
import clientEmergencySlice from "../features/clientEmergencySlice";

export const store = configureStore({
  reducer: {
    clientAuthReducer,
    auth: authSlice,
    emergency: emergencySlice,
    clientEmergency: clientEmergencySlice,
  },
});
