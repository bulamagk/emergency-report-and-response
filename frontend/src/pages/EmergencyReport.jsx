import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/emergency.jpg";
import ClientUnresolvedEmergencies from "../components/ClientUnresolvedEmergencies";
import ClientResolvedEmergencies from "../components/ClientResolvedEmergencies";
import ReportForm from "../components/ReportForm";
import LogoutModal from "../components/LogoutModal";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import axios from "../api/axiosInstance";
import socketIO from "socket.io-client";

const EmergencyReport = () => {
  const navigate = useNavigate();

  // Initialize IO
  const io = socketIO("http://localhost:3001");

  const user = useSelector((state) => state.clientAuthReducer.user);

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  function handleClose() {
    setIsOpenModal((prev) => !prev);
  }

  function toggleLogout() {
    setLogout((prev) => !prev);
  }

  // Report emergency function
  async function reportEmergency(type, description) {
    const data = {
      user: user.id,
      type,
      description,
      coordinates: location,
    };

    setIsReporting((prev) => !prev);

    try {
      const response = await axios.post(`/emergencies`, data);

      if (response) {
        const resData = await response.data;
        console.log(resData);

        setIsOpenModal((prev) => !prev);
      }
    } catch (error) {
      alert(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsReporting((prev) => !prev);
    }
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

  // Fetch user emergencies
  useEffect(() => {
    async function fetchEmergencies() {
      try {
        const response = await axios.get(`/emergencies?user=${user.id}`);
        const resData = await response.data;

        console.log("My Emergencies: ", resData);
        if (resData.length) {
          alert("Emergencies fetched");
        }
      } catch (error) {
        alert(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmergencies();
  }, []);

  // Join socket room on login
  io.on("connect", () => {
    io.emit("joinReporterRoom", user.id);
  });

  // Listen for io event from the server
  io.on("test", (data) => alert(data));

  if (isLoading) {
    return (
      <section className="overlay bg-transparent text-blue-600 flex items-center justify-center absolute inset-0">
        <BallTriangle color="dodgerblue" />
      </section>
    );
  }

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
          {[].length ? (
            <ClientUnresolvedEmergencies emergencies={unResolvedEmergencies} />
          ) : null}

          {/* Render Resolved Emergencies */}
          {[].length ? (
            <ClientResolvedEmergencies emergencies={resolvedEmergencies} />
          ) : null}
        </section>
        {isOpenModal && (
          <ReportForm
            handleClose={handleClose}
            reportEmergency={reportEmergency}
            isReporting={isReporting}
          />
        )}
      </section>
      {logout && <LogoutModal toggleLogout={toggleLogout} user={"client"} />}
    </>
  );
};

export default EmergencyReport;
