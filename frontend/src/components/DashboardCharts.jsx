import PieChart from "./PieChart";
import axios from "../api/axiosInstance";
import { useEffect, useState } from "react";

const DashboardCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchEmergencies() {}
  }, []);

  return (
    <section className="w-full grid grid-cols-1 gap-4 items-center">
      {/* PIE CHART */}
      <PieChart />

      {/* BAR CHART Representing Emergency Type e.g Fire, Medical, etc */}
    </section>
  );
};

export default DashboardCharts;
