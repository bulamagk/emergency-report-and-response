import { useState } from "react";
import PageTitle from "../components/PageTitle";
import NewClientEmergency from "../components/NewEmergency";

const data = [
  {
    id: 1,
    type: "Medical",
    description: "In need of an urgent assistant from you",
    status: "Resolved",
    date: "12-12-24",
  },
  {
    id: 2,
    type: "Fire",
    description: "In need of an urgent assistant from you",
    status: "Dispatched",
    date: "12-12-24",
  },
  {
    id: 3,
    type: "Accident",
    description: "In need of an urgent assistant from you",
    status: "Resolved",
    date: "12-12-24",
  },
  {
    id: 4,
    type: "Natural Disaster",
    description: "In need of an urgent assistant from you",
    status: "Pending",
    date: "12-12-24",
  },
  {
    id: 5,
    type: "Natural Disaster",
    description: "In need of an urgent assistant from you",
    status: "Pending",
    date: "12-12-24",
  },
  {
    id: 6,
    type: "Natural Disaster",
    description: "In need of an urgent assistant from you",
    status: "Pending",
    date: "12-12-24",
  },
];
const Emergencies = () => {
  const [emergencies, setEmergencies] = useState(data);
  return (
    <>
      <PageTitle title="Emergencies" />
      <section className="flex flex-col gap-4">
        {/* Emergenices */}
        {emergencies.length ? (
          emergencies.map((emergency) => (
            <NewClientEmergency key={emergency.id} {...emergency} />
          ))
        ) : (
          <p>No Emergency</p>
        )}
      </section>
    </>
  );
};

export default Emergencies;
