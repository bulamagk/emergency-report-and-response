import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import DashboardStat from "./pages/DashboardStats";
import Emergencies from "./pages/Emergencies";
import ResolvedEmergencies from "./pages/ResolvedEmergencies";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import EmergencyReport from "./pages/EmergencyReport";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/emergency",
        element: <EmergencyReport />,
      },
      {
        path: "/admin",
        element: <Login />,
      },
      {
        path: "/dashboard/",
        element: <DashboardPage />,
        children: [
          {
            path: "",
            element: <DashboardStat />,
          },
          {
            path: "emergencies",
            element: <Emergencies />,
          },
          {
            path: "resolved",
            element: <ResolvedEmergencies />,
          },
          {
            path: "staff",
            element: <Staff />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
