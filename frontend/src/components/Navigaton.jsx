import {
  FaDashcube,
  FaFileMedical,
  FaAmbulance,
  FaUser,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const Navigaton = ({ toggleLogout }) => {
  return (
    <section className="bg-inherit p-4 px-2">
      <h2 className="text-5xl pl-4 text-blue-800 font-extrabold mb-4">
        <span className="text-red-700">E</span>RR
      </h2>

      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 rounded  text-sm hover:text-white hover:bg-blue-500 md:text-xl 
            ${isActive ? "bg-blue-500 text-white" : "text-stone-800"}
            `
            }
            to="/dashboard/"
            end
          >
            <span className="bg-blue-500 rounded">
              <FaDashcube className="m-2 text-white" size={20} />
            </span>
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 rounded  text-sm hover:text-white hover:bg-blue-500 md:text-xl 
            ${isActive ? "bg-blue-500 text-white" : "text-stone-800"}
            `
            }
            to="/dashboard/emergencies"
          >
            <span className="bg-blue-500 rounded">
              <FaAmbulance className="m-2 text-white" size={14} />
            </span>
            Emergencies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 rounded  text-sm hover:text-white hover:bg-blue-500 md:text-xl 
            ${isActive ? "bg-blue-500 text-white" : "text-stone-800"}
            `
            }
            to="/dashboard/resolved"
          >
            <span className="bg-blue-500 rounded">
              <FaFileMedical className="m-2 text-white" size={14} />
            </span>
            Resolved Emergencies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 rounded  text-sm hover:text-white hover:bg-blue-500 md:text-xl 
            ${isActive ? "bg-blue-500 text-white" : "text-stone-800"}
            `
            }
            to="/dashboard/staff"
          >
            <span className="bg-blue-500 rounded">
              <FaUsers className="m-2 text-white" size={14} />
            </span>
            Staff
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 rounded  text-sm hover:text-white hover:bg-blue-500 md:text-xl 
            ${isActive ? "bg-blue-500 text-white" : "text-stone-800"}
            `
            }
            to="/dashboard/profile"
          >
            <span className="bg-blue-500 rounded">
              <FaUser className="m-2 text-white" size={14} />
            </span>
            Profile
          </NavLink>
          <Link
            onClick={toggleLogout}
            className="
              flex items-center gap-2 p-4 rounded  text-sm text-stone-800 hover:text-white hover:bg-blue-500 md:text-xl 
            "
          >
            <span className="bg-blue-500 rounded">
              <FaSignOutAlt className="m-2 text-white" size={14} />
            </span>
            Logout
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Navigaton;
