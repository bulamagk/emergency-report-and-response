import PieChart from "./PieChart";

const DashboardCharts = () => {
  return (
    <section className="w-full grid grid-cols-1 gap-4 items-center">
      {/* PIE CHART */}
      <PieChart />

      {/* BAR CHART Representing Emergency Type e.g Fire, Medical, etc */}
    </section>
  );
};

export default DashboardCharts;
