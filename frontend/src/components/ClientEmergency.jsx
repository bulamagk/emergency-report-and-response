import { FaClock, FaCheckCircle } from "react-icons/fa";

const ClientEmergency = ({ id, type, description, status, date }) => {
  return (
    <section
      className={`shadow p-4 rounded-sm ${
        status == "Resolved"
          ? "bg-green-200"
          : status == "Dispatched"
          ? "bg-yellow-200"
          : "bg-red-200"
      }`}
    >
      <section className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-stone-800 font-bold md:text-3xl">
          {type} Emergency
        </h2>
        <section className="flex gap-2 items-center text-stone-800 md:text-2xl">
          {status}
          {status == "Resolved" ? (
            <FaCheckCircle size={30} />
          ) : (
            <FaClock size={30} />
          )}
        </section>
      </section>
      <p className="mb-4 text-stone-700 md:text-2xl">{description}</p>
      <p className="text-sm opacity-75 md:text-xl">{date}</p>
    </section>
  );
};

export default ClientEmergency;