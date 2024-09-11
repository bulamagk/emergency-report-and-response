import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);
    const statusErrorStatusCode = error.response.status;
    switch (statusErrorStatusCode) {
      case 400:
        toast.error("400 ERROR: ", error.response.data.message);
        break;

      case 401:
        toast.error("401 ERROR: ", error.response.data.message);
        break;

      default:
        toast.error("Unexpected Error Occured");
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
