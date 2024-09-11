import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import axios from "../api/axiosInstance";

const DashboardCharts = () => {
  const [chartStat, setChartStat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardChart() {
      try {
        const response = await axios.get("/dashboard-chart");
        const data = await response.data;
        setChartStat(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => !prev);
      }
    }

    getDashboardChart();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center mt-12">
        <Grid />
      </section>
    );
  }

  return (
    <section className="w-full grid grid-cols-1 gap-4 items-center">
      {/* PIE CHART */}
      <PieChart {...chartStat.pieChart} />

      {/* BAR CHART Representing Emergency Type e.g Fire, Medical, etc */}
    </section>
  );
};

export default DashboardCharts;
