import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const SingleEmergency = () => {
  const { id } = useParams();
  const location = { lat: 9.081999, lon: 8.675277 };
  const [emergency, setEmergency] = useState({
    id: 3,
    type: "Medical",
    status: "Dispatched",
    description: "There is an emergency case I need your assistance",
    data: "12-06-2024",
  });

  function handleStatusChange(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const status = formData.get("status");

    if (!status) return;

    console.log(status);
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
            <span>Medical</span>
          </p>
          <p className="flex items-center gap-2 text-xl my-3 text-stone-800">
            <span className="font-bold">Status: </span>
            <span
              className={`flex items-center gap-2 p-2 ${
                emergency.status == "Pending"
                  ? "text-red-500"
                  : "text-yellow-600"
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
              <button className="bg-blue-500 md:w-1/2" type="submit">
                Update
              </button>
            </section>
          </form>
          {/* End Emergency Update Form */}
          <section className="text-xl my-3 text-stone-800">
            <span className="font-bold">Description: </span> <br />
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              inventore, sint voluptate natus reiciendis minima sequi possimus
              repellat molestiae ratione, iure neque. Numquam debitis labore
              consequatur, non repudiandae officia quod.
            </p>
          </section>
        </section>
        <section id="reporterInfo" className="flex-1">
          <p className="text-stone-800 font-bold text-2xl mb-4">
            Reporter Information
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Full Name: </span>
            <span>Peter Bulama</span>
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Phone Number: </span>
            <span>08102325688</span>
          </p>
          <p className="text-xl my-3 text-stone-800">
            <span className="font-bold">Email: </span>
            <span>bulamagk@gmail.com</span>
          </p>
        </section>
      </section>

      <MapComponent location={location} />
    </section>
  );
};

export default SingleEmergency;
