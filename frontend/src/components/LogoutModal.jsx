import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/clientAuthSlice";
import { logout as adminLogout } from "../features/authSlice";

const LogoutModal = ({ toggleLogout, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    if (user == "client") {
      navigate("/");
      dispatch(logout());
    } else {
      dispatch(adminLogout());
      navigate("/admin");
    }
  }

  return (
    <section className="flex items-center justify-center absolute h-screen w-screen inset-0 overlay z-50">
      <section className="bg-white p-4 rounded w-3/4 md:w-3/12">
        <section className="flex gap-4  items-center">
          <section>
            <FaQuestionCircle className="text-blue-600 text-6xl md:text-8xl" />
          </section>
          <section className="flex-1">
            <p className="text-xl mb-6 font-bold">Logout?</p>
            <section className="flex items-center gap-2">
              <button onClick={handleLogout} className=" bg-blue-600 flex-1">
                Yes
              </button>
              <button onClick={toggleLogout} className=" bg-blue-600 flex-1">
                No
              </button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default LogoutModal;
