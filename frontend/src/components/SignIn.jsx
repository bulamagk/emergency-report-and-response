import { useNavigate } from "react-router-dom";
import { login } from "../features/clientAuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

const SignIn = ({ toggleSignIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState(false);

  function handleClose() {
    toggleSignIn();
  }

  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const loginCredentials = {
      email,
    };

    // Make a network call to login
    setIsloading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/users/auth`,
        loginCredentials
      );
      const resData = await response.data;

      // Set user
      const user = {
        id: resData._id,
        email: resData.email,
        name: `${resData.othername} ${resData.surname}`,
      };
      dispatch(login(user));
      setIsloading(false);

      // Redirect user to emergency page
      navigate("/emergency");
    } catch (error) {
      console.log(error);
      if (error.response.status == 500) {
        toast.error(error?.response?.statusText);
      } else if (error.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setIsloading(false);
  }
  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-8 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">Sign In</h2>
          <button onClick={handleClose} className="hover:bg-red-800">
            Close
          </button>
        </header>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <section className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="email" required />
          </section>
          <section className="form-group">
            <button
              className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait!!!" : "Sign In"}
            </button>
          </section>
        </form>
      </article>
    </section>
  );
};

export default SignIn;
