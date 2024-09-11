import { useNavigate } from "react-router-dom";
import emergencyPic from "../assets/emergency.jpg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";
import Loader from "../components/Loader";

const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsloading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginCredentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Make a api call to login
    setIsloading(true);
    try {
      const response = await axios.post(`/admin/users/login`, loginCredentials);
      const resData = await response.data;
      dispatch(login(resData));
      setIsloading(false);

      // Redirect user to emergency page
      navigate("/dashboard");
    } catch (error) {
      if (!error.response) {
        toast.error(error.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
    setIsloading(false);
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <section className="min-h-[100vh] w-full md:flex md:flex-col md:justify-center">
      <section className="container pt-6 grid grid-cols-1 gap-4 h-full md:grid-cols-2">
        <article>
          <h1 className="text-8xl text-blue-800 font-extrabold mb-2">
            <span className="text-red-600 font-extrabold">E</span>
            RR
          </h1>

          <h1 className="hidden text-2xl text-stone-600 font-extrabold mb-2 md:block ">
            Emergency Report & Reponse System
          </h1>
          <p className="text-stone-800 text-3xl my-6 mt-10 font-bold">Admin</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <section className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="email" name="email" id="email" required />
            </section>
            <section className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="password" name="password" id="password" required />
            </section>
            <section className="form-group">
              <button
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-950"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    <span>Please wait</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </section>
          </form>
        </article>
        <img
          className="rounded shadow-lg hidden md:block"
          src={emergencyPic}
          alt=""
        />
      </section>
    </section>
  );
};

export default Login;
