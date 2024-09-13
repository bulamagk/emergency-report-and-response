import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import ResolvedEmergenciesTableComponent from "../components/ResolvedEmergenciesTableComponent";
import { Grid } from "react-loader-spinner";
import axios from "../api/axiosInstance";

const ResolvedEmergencies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getResolvedEmergencies() {
      try {
        const response = await axios.get("/emergencies?status=Resolved");
        if (response) {
          const data = await response.data;
          setData(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => !prev);
      }
    }

    getResolvedEmergencies();
  }, []);

  return (
    <>
      <PageTitle title="Resolved Emergencies" />
      {loading && (
        <section className="flex items-center justify-center mt-12">
          <Grid />
        </section>
      )}
      {data?.length ? (
        <ResolvedEmergenciesTableComponent data={data} />
      ) : (
        !loading && <p>No data to display</p>
      )}
    </>
  );
};

export default ResolvedEmergencies;
