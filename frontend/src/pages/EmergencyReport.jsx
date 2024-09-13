import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setEmergency,
  newEmergency,
  updateEmergency,
} from "../features/clientEmergencySlice";

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
  const dispatch = useDispatch();

  // Initialize IO
  const io = socketIO(import.meta.env.VITE_SERVER_IO);

  const user = useSelector((state) => state.clientAuthReducer.user);
  const emergencies = useSelector((state) => state.clientEmergency);

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
        dispatch(newEmergency(resData));
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

        // console.log("My Emergencies: ", resData);
        if (resData.length) {
          dispatch(setEmergency(resData));
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

  // Listen for emergencyio event from the server
  io.on("emergencyUpdate", (data) => {
    dispatch(updateEmergency(data));
  });

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
          {emergencies?.length ? (
            <ClientUnresolvedEmergencies data={emergencies} />
          ) : null}

          {/* Render Resolved Emergencies */}
          {emergencies.length ? (
            <ClientResolvedEmergencies data={emergencies} />
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
