import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import StaffTableComponent from "../components/StaffTableComponent";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";
import RegisterStaffComponent from "../components/RegisterStaffComponet";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Delete staff
  async function deleteStaff(id) {
    setIsLoading((prev) => !prev);
    try {
      const response = await axios.delete(`/admin/users/${id}`);
      const resData = await response.data;
      toast.success(resData.message);
      const newData = data.filter((user) => user._id !== id);
      setData(newData);
    } catch (error) {
    } finally {
    }
    setIsLoading((prev) => !prev);
  }

  //   Fetch Staff
  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await axios.get(`/admin/users`);
        const resData = await response.data;

        setData(resData);
      } catch (error) {
        if (error.response.status == 401) {
          toast.error("Please sign in");
          navigate("/admin");
        }
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStaff();
  }, []);

  if (isLoading) {
    return (
      <section className="overlay bg-transparent text-blue-600 flex items-center justify-center absolute inset-0">
        <BallTriangle color="dodgerblue" />
      </section>
    );
  }

  return (
    <>
      <PageTitle title="Staff" />
      <section className="flex items-center justify-end mb-4">
        <button
          onClick={() => setIsRegisterModal((prev) => !prev)}
          className="bg-blue-600 p-2 text-sm"
        >
          Register Staff
        </button>
      </section>
      <StaffTableComponent
        data={data}
        deleteStaff={deleteStaff}
        loading={loading}
        setLoading={setIsLoading}
      />
      {isRegisterModal ? (
        <RegisterStaffComponent
          setIsRegisterModal={setIsRegisterModal}
          setData={setData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Staff;
