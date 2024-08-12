import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaBars, FaBell } from "react-icons/fa";

import Navigaton from "./Navigaton";
const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const asideRef = useRef();
  const overlayRef = useRef();

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
  return (
    <main className="bg-slate-50 flex overflow-hidden h-[100dvh]">
      <aside
        ref={asideRef}
        id="aside"
        className="bg-blue-50 transition-all duration-500 w-0 md:w-[20%]"
      >
        <Navigaton />
      </aside>

      <section className="bg-white flex-auto relative">
        <header className="bg-white shadow p-4 w-full flex justify-between relative z-10">
          <section className="md:hidden">
            <FaBars
              onClick={handleMenuToggle}
              size={18}
              className="text-stone-800 hover:cursor-pointer"
            />
          </section>
          <section>
            <p className="text-stone-600">John Doe</p>
          </section>
          <section
            className="relative mr-4 my-1 cursor-pointer"
            onClick={handleNotificationClick}
          >
            <FaBell className="text-blue-500 text-2xl" />
            <span
              className="absolute -top-3 left-4 w-6 flex justify-center items-center bg-red-500 text-white text-xs
            p-1 rounded-full"
            >
              5
            </span>
          </section>
        </header>
        <section id="page" className="p-4">
          {children}
        </section>
        <section
          ref={overlayRef}
          onClick={handleMenuToggle}
          className="hidden overlay absolute inset-0 from-black to-black md:hidden"
        ></section>
      </section>
    </main>
  );
};

export default Dashboard;
