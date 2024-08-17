import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../features/clientAuthSlice";
import { useDispatch } from "react-redux";

const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

const SignUp = ({ toggleSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState(false);

  function handleClose() {
    toggleSignUp();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Send data to server
    setIsloading(true);

    try {
      const response = await axios.post(`${baseUrl}/users`, data);
      const resData = await response.data;

      // Set user
      const user = {
        email: resData.email,
        name: `${resData.othername} ${resData.surname}`,
      };
      dispatch(login(user));

      // Redirect user to emergency page
      navigate("/emergency");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    setIsloading(false);
  }
  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-8 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">Sign Up</h2>
          <button onClick={handleClose} className="hover:bg-red-800">
            Close
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <section className="form-group">
            <label htmlFor="Surname">
              Surname <span className="text-red-600">*</span>
            </label>
            <input type="text" name="surname" id="surname" required />
          </section>
          <section className="form-group">
            <label htmlFor="Othername">
              Othername <span className="text-red-600">*</span>
            </label>
            <input type="text" name="othername" id="othername" required />
          </section>
          <section className="form-group">
            <label htmlFor="Email">
              Email <span className="text-red-600">*</span>
            </label>
            <input type="email" name="email" id="email" required />
          </section>
          <section className="form-group">
            <label htmlFor="Phone">
              Phone <span className="text-red-600">*</span>
            </label>
            <input type="text" name="phone" id="phone" required />
          </section>
          <section className="form-group">
            <button
              className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait!!!" : "Sign Up"}
            </button>
          </section>
        </form>
      </article>
    </section>
  );
};

export default SignUp;
