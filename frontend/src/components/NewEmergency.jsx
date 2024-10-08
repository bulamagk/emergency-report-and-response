import { FaClock, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewClientEmergency = ({ _id, type, description, status, date }) => {
  return (
    <Link
      to={`/dashboard/emergencies/${_id}`}
      className={`shadow-md p-4 rounded-md ${
        status == "Pending" ? "bg-red-400" : "bg-yellow-500"
      }`}
    >
      <section className="flex justify-between items-center mb-4 text-white">
        <h4 className="text-white font-bold md:text-2xl">{type} Emergency</h4>
        <section className="flex gap-2 items-center md:text-2xl">
          <FaClock size={30} />
        </section>
      </section>
      <p className="mb-4 text-white md:text-xl">{description}</p>
      <p className="text-white opacity-75 ">{date}</p>
    </Link>
  );
};

export default NewClientEmergency;
