import React from "react";
import PageTitle from "../components/PageTitle";
import DashboardGrid from "../components/DashboardGrid";
import DashboardCharts from "../components/DashboardCharts";

const DashboardStats = () => {
  return (
    <>
      <PageTitle title="Dashboard" />
      <DashboardGrid />
      <DashboardCharts />
    </>
  );
};

export default DashboardStats;
