import { useEffect, useState } from "react";
import logo from "../assets/emergency.jpg";
import { FaUser } from "react-icons/fa";
import ClientUnresolvedEmergencies from "../components/ClientUnresolvedEmergencies";
import ClientResolvedEmergencies from "../components/ClientResolvedEmergencies";
import ReportForm from "../components/ReportForm";

const EmergencyReport = () => {
  const [cordinates, setCordinates] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClose() {
    setIsOpenModal((prev) => !prev);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCordinates({ latitude, longitude });
        console.log(cordinates);
      },
      (err) => {
        alert("Please refresh page and allow access to your location!");
      }
    );
  }, []);

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
  ];
  const [emergencies, setEmergencies] = useState(data);

  const unResolvedEmergencies = emergencies.filter(
    (emergency) => emergency.status !== "Resolved"
  );

  const resolvedEmergencies = emergencies.filter(
    (emergency) => emergency.status == "Resolved"
  );

  return (
    <section>
      <header className="shadow-md">
        <section className="container flex items-center justify-between py-4">
          <img
            width={50}
            className="rounded-full aspect-square"
            src={logo}
            alt=""
          />
          <article className="cursor-pointer">
            <FaUser className="text-stone-800" size={25} />
          </article>
        </section>
      </header>
      <section className="container min-h-[90dvh] flex flex-col justify-center">
        <button
          onClick={() => setIsOpenModal((prev) => !prev)}
          className="w-full my-5 bg-red-500 font-extrabold text-xl"
        >
          Report An Emergency
        </button>

        {/* Render Unresolved Emergencies */}
        {unResolvedEmergencies.length ? (
          <ClientUnresolvedEmergencies emergencies={unResolvedEmergencies} />
        ) : null}

        {/* Render Resolved Emergencies */}
        {resolvedEmergencies.length ? (
          <ClientResolvedEmergencies emergencies={resolvedEmergencies} />
        ) : null}
      </section>
      {isOpenModal && <ReportForm handleClose={handleClose} />}
    </section>
  );
};

export default EmergencyReport;
