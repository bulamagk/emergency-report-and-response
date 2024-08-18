import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
