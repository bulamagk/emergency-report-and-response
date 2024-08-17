import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/emergency.jpg";
import ClientUnresolvedEmergencies from "../components/ClientUnresolvedEmergencies";
import ClientResolvedEmergencies from "../components/ClientResolvedEmergencies";
import ReportForm from "../components/ReportForm";
import LogoutModal from "../components/LogoutModal";
import { toast } from "react-toastify";

const EmergencyReport = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.clientAuthReducer.user);

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [logout, setLogout] = useState(false);

  function handleClose() {
    setIsOpenModal((prev) => !prev);
  }

  function toggleLogout() {
    setLogout((prev) => !prev);
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          toast.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // UseEffect to log location whenever it changes
  useEffect(() => {
    if (location.lat && location.lon) {
      console.log("Location updated:", location);
    }
  }, [location]);

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
    <>
      <section>
        <header className="shadow-md">
          <section className="container flex items-center justify-between py-4">
            <section className="flex items-center gap-4">
              <img
                width={50}
                className="rounded-full aspect-square"
                src={logo}
                alt=""
              />
              <p className="font-bold opacity-70">{user?.name}</p>
            </section>
            <article className="cursor-pointer">
              <button onClick={toggleLogout} className="bg-blue-600">
                Logout
              </button>
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
      {logout && <LogoutModal toggleLogout={toggleLogout} user={"client"} />}
    </>
  );
};

export default EmergencyReport;
