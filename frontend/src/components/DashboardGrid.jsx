import { Link } from "react-router-dom";
import { FaAmbulance, FaFileMedical, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import axios from "../api/axiosInstance";

const DashboardGrid = () => {
  const [gridStat, setGridStat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardGrid() {
      try {
        const response = await axios.get("/dashboard-grid");
        const data = await response.data;
        setGridStat(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => !prev);
      }
    }

    getDashboardGrid();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center">
        <Grid />
      </section>
    );
  }

  return (
    <section id="grid" className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Link to={"/dashboard/emergencies"}>
        <section className="flex flex-col gap-4  text-white bg-gradient-to-b from-blue-800 to-blue-500 p-8 shadow-md rounded-md transition-all duration-1000 hover:from-black hover:to-stone-950">
          <section className="flex justify-between items-center">
            <p className="text-xl">Pending Emergencies</p>
            <FaAmbulance size={40} />
          </section>
          <p className="text-3xl font-bold md:text-5xl">
            {gridStat?.pendingEmergencies ?? 0}
          </p>
        </section>
      </Link>

      <Link to={"/dashboard/resolved"}>
        <section className="flex flex-col gap-4  text-white bg-gradient-to-b from-blue-800 to-blue-500 p-8 shadow-md rounded-md transition-all duration-1000 hover:from-black hover:to-stone-950">
          <section className="flex justify-between items-center">
            <p className="text-xl">Resolved Emergencies</p>
            <FaFileMedical size={40} />
          </section>
          <p className="text-3xl font-bold md:text-5xl">
            {gridStat?.resolvedEmergencies ?? 0}
          </p>
        </section>
      </Link>

      <Link to={"/dashboard/staff"}>
        <section className="flex flex-col gap-4  text-white bg-gradient-to-b from-blue-800 to-blue-500 p-8 shadow-md rounded-md transition-all duration-1000 hover:from-black hover:to-stone-950">
          <section className="flex justify-between items-center">
            <p className="text-xl">Total Staff</p>
            <FaUsers size={40} />
          </section>
          <p className="text-3xl font-bold md:text-5xl">
            {gridStat?.staff ?? 0}
          </p>
        </section>
      </Link>
    </section>
  );
};

export default DashboardGrid;
