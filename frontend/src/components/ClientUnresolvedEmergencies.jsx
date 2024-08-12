import React from "react";
import ClientEmergency from "./ClientEmergency";

const ClientUnresolvedEmergencies = ({ emergencies }) => {
  return (
    <section className="mt-10">
      <h2 className="text-3xl mb-2 md:text-5xl">Unresolved Emergencies</h2>
      <section className="flex flex-col gap-4 py-4">
        {[...emergencies].map((emergency) => (
          <ClientEmergency key={emergency.id} {...emergency} />
        ))}
      </section>
    </section>
  );
};

export default ClientUnresolvedEmergencies;
