import React from "react";
import ClientEmergency from "./ClientEmergency";

const ClientUnresolvedEmergencies = ({ data }) => {
  const emergencies = [...data].filter(
    (emergency) => emergency.status != "Resolved"
  );

  return (
    <section className="mt-10">
      <h2 className="text-3xl mb-2 md:text-5xl">Unresolved Emergencies</h2>
      <section className="flex flex-col gap-4 py-4">
        {[...emergencies].map((emergency) => (
          <ClientEmergency key={emergency._id} emergency={emergency} />
        ))}
      </section>
    </section>
  );
};

export default ClientUnresolvedEmergencies;
