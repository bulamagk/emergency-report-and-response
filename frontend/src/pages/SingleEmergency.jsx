import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmergency } from "../features/emergencySlice";

import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import axios from "../api/axiosInstance";

const SingleEmergency = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [emergency, setEmergency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchEmergency() {
      try {
        const response = await axios.get(`/emergencies/${id}`);
        if (response) {
          const emergency = await response.data;
          setEmergency(emergency);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prev) => !prev);
      }
    }

    fetchEmergency();
  }, []);

  async function handleStatusChange(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const status = formData.get("status");

    if (!status) return;

    const data = { id: emergency._id, userId: emergency.user._id, status };

    setIsUpdating((prev) => !prev);
    try {
      const response = await axios.put(`/emergencies/`, data);
      if (response) {
        const emergency = await response.data;

        // Update store
        dispatch(updateEmergency({ id, status }));

        // Update this page UI
        setEmergency((prev) => ({ ...prev, status }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating((prev) => !prev);
    }
  }

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <section>
      <header className="flex items-center gap-2 divide-x-2">
        <Link
          to="/dashboard/emergencies"
          className="flex items-center gap-2 text-xl text-blue-600"
        >
          <FaArrowCircleLeft />
          <span className="text-stone-800">Back</span>
        </Link>
        <p className="text-xl text-stone-600 font-bold pl-2">
          {emergency.type} Emergency
        </p>
      </header>
      <section className="flex flex-col gap-4 mt-4 md:flex-row md:justify-between md:gap-10 md:mt-8">
        <section id="emergencyInfo" className="flex-1">
          <p className="text-stone-800 font-bold text-2xl mb-4">
            Emergency Information
          </p>
          <p className="text-xl my-3 mb-6 text-stone-800">
            <span className="font-bold">Type: </span>
            <span>{emergency.type}</span>
          </p>
          <p className="flex items-center gap-2 text-xl my-3 text-stone-800">
            <span className="font-bold">Status: </span>
            <span
              className={`flex items-center gap-2 p-2 ${
                emergency.status === "Pending"
                  ? "text-red-500"
                  : emergency.status === "Dispatched"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              <FaClock /> {emergency.status}
            </span>
          </p>
          {/* Emergency Update Form */}
          <form className="mb-8" onSubmit={handleStatusChange}>
            <section className="form-group md:w-1/2">
              <select
                className="p-2 text-stone-600 text-xl"
                name="status"
                id="status"
              >
                <option value="">--Select Status--</option>
                <option value="Pending">Pending</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Resolved">Resolved</option>
              </select>
            </section>
            <section className="form-group my-2">
              <button
                disabled={isUpdating}
                className="bg-blue-500 md:w-1/2"
                type="submit"
              >
                {isUpdating ? "Updating, please wait" : "Update"}
              </button>
            </section>
          </form>
          {/* End Emergency Update Form */}
          <section className="text-xl my-3 text-stone-800">
            <span className="font-bold">Description: </span> <br />
            <p className="text-justify">{emergency.description}</p>
          </section>
        </section>
        <section id="reporterInfo" className="flex-1">
          <p className="text-stone-800 font-bold text-2xl mb-4">
            Reporter Information
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Full Name: </span>
            <span>
              {emergency.user.othername} {emergency.user.surname}
            </span>
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Phone Number: </span>
            <span>{`0${emergency.user.phone}`}</span>
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Email: </span>
            <span>{emergency.user.email}</span>
          </p>
        </section>
      </section>

      <MapComponent location={emergency.coordinates} />
    </section>
  );
};

export default SingleEmergency;
