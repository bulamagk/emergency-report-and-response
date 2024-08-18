import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";

const RegisterStaffComponent = ({ setIsRegisterModal, setData }) => {
  const [isLoading, setIsloading] = useState(false);

  function handleClose() {
    setIsRegisterModal((prev) => !prev);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords does not match!");
      return;
    }

    // Send data to server
    setIsloading(true);
    try {
      const response = await axios.post(`/admin/users`, data);
      const resData = await response.data;
      const staff = { ...resData, id: resData._id };
      setData((prev) => [staff, ...prev]);
      toast.success("Staff registered successfully!");
      setIsRegisterModal((prev) => !prev);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from the server.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsloading(false);
    }
  }
  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-20 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">Register Staff</h2>
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
            <label htmlFor="Password">
              Password <span className="text-red-600">*</span>
            </label>
            <input type="password" name="password" id="password" required />
          </section>
          <section className="form-group">
            <label htmlFor="Phone">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
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

export default RegisterStaffComponent;
