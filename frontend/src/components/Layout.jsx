import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setEmergency } from "../features/clientEmergencySlice";

import axios from "../api/axiosInstance";
import socketIO from "socket.io-client";

import emergencyAlarm from "../assets/loud-emergency-alarm.mp3";

import { FaBars, FaBell } from "react-icons/fa";

import Navigaton from "./Navigaton";
import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const emergencies = useSelector((state) => state.emergency);

  const emergencyAlert = useRef();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/admin");
      toast.error("Please sign");
    }
  }, []);

  // Alert sound
  function alertSound() {
    if (emergencyAlert.current) {
      emergencyAlert.current.play();
    }
  }

  if (emergencies.length) {
    alertSound();
  } else {
    if (emergencyAlert.current) {
      emergencyAlert.current.pause();
      emergencyAlert.current.currentTime = 0;
    }
  }

  // Initialize IO
  const io = socketIO("http://localhost:3001");

  // Fetch  emergencies
  useEffect(() => {
    async function getEmergencies() {
      try {
        const response = await axios.get("/emergencies");
        if (response) {
          const data = await response.data;
          dispatch(setEmergency(data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    getEmergencies();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const asideRef = useRef();
  const overlayRef = useRef();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  function toggleLogout() {
    setIsLogoutModalOpen((prev) => !prev);
  }

  useEffect(() => {
    asideRef.current.classList.remove("show");
    overlayRef.current.classList.add("hidden");
  }, [location]);

  function handleNotificationClick() {
    navigate("/dashboard/emergencies");
  }

  function handleMenuToggle() {
    asideRef.current.classList.toggle("show");
    overlayRef.current.classList.toggle("hidden");
  }

  // Join socket room on login
  io.on("connect", () => {
    io.emit("joinAdminsRoom", "admin");
  });

  // Listen for new emergency
  io.on("newEmergency", (emergency) => {
    console.log(emergency);
    setEmergencySound(true);
  });

  return (
    <main className="bg-slate-50 flex overflow-hidden h-[100dvh]">
      <aside
        ref={asideRef}
        id="aside"
        className="bg-blue-50 transition-all duration-500 w-0 md:w-[20%]"
      >
        <Navigaton toggleLogout={toggleLogout} />
      </aside>

      <section className="bg-white min-h-full overflow-x-hidden overflow-y-auto flex-auto relative">
        <header className="bg-white shadow p-4 w-full flex justify-between sticky inset-0 z-10">
          <section className="md:hidden">
            <FaBars
              onClick={handleMenuToggle}
              size={18}
              className="text-stone-800 hover:cursor-pointer"
            />
          </section>
          <section>
            <p className="text-stone-600">{`${user?.othername} ${user?.surname}`}</p>
          </section>
          <section
            className="relative mr-4 my-1 cursor-pointer"
            onClick={handleNotificationClick}
          >
            <FaBell className="text-blue-500 text-2xl" />

            {emergencies?.length ? (
              <span
                className="absolute -top-3 left-4 w-6 flex justify-center items-center bg-red-500 text-white text-xs
            p-1 rounded-full"
              >
                {emergencies.length}
              </span>
            ) : (
              ""
            )}
          </section>
          {/* Emergency Alert */}
          <audio
            className="hidden"
            ref={emergencyAlert}
            src={emergencyAlarm}
            loop
            controls
          ></audio>
        </header>
        <section id="page" className="p-4">
          {children}
        </section>
        <section
          ref={overlayRef}
          onClick={handleMenuToggle}
          className="hidden overlay absolute inset-0 md:hidden"
        ></section>
      </section>
      {isLogoutModalOpen && (
        <LogoutModal user="admin" toggleLogout={toggleLogout} />
      )}
    </main>
  );
};

export default Layout;
