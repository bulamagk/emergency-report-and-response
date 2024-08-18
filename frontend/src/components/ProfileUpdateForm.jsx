import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

const ProfileUpdateForm = ({ toggleModal, userId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsloading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`/admin/users/${userId}`);
        const resData = await response.data;
        const phone = "0" + resData.phone;
        setData({ ...resData, phone });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsloading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <section className="overlay bg-transparent text-blue-600 flex items-center justify-center absolute inset-0">
        <BallTriangle color="dodgerblue" />
      </section>
    );
  }

  function handleClose() {
    toggleModal();
  }

  function handleChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    setIsUpdating(true);
    try {
      const response = await axios.put(`/admin/users/${userId}`, formData);
      const resData = await response.data;
      console.log("Updated ", resData);
      dispatch(login(resData));
      toast.success("Profile updated successfully");
      toggleModal();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-8 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">Update Profile</h2>
          <button onClick={handleClose} className="hover:bg-red-800">
            Close
          </button>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <section className="form-group">
            <label htmlFor="Surname">
              Surname <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={data.surname}
              onChange={handleChange}
              required
            />
          </section>
          <section className="form-group">
            <label htmlFor="Othername">
              Othername <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="othername"
              id="othername"
              value={data.othername}
              onChange={handleChange}
              required
            />
          </section>
          <section className="form-group">
            <label htmlFor="Email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </section>
          <section className="form-group">
            <label htmlFor="Phone">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              onChange={handleChange}
              value={data.phone}
            />
          </section>
          <section className="form-group">
            <button
              className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-300"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Please wait!!!" : "Update"}
            </button>
          </section>
        </form>
      </article>
    </section>
  );
};

export default ProfileUpdateForm;
