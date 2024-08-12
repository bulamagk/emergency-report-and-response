import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};

export default DashboardPage;
