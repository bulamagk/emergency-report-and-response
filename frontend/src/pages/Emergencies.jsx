import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import NewClientEmergency from "../components/NewEmergency";

const Emergencies = () => {
  const emergencies = useSelector((state) => state.emergency);

  return (
    <>
      <PageTitle title="Emergencies" />
      <section className="flex flex-col gap-4">
        {/* Emergenices */}
        {emergencies.length ? (
          emergencies.map((emergency) => (
            <NewClientEmergency key={emergency._id} {...emergency} />
          ))
        ) : (
          <p>No data to display</p>
        )}
      </section>
    </>
  );
};

export default Emergencies;
