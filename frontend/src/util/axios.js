import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cmpt732-backend.herokuapp.com",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  error =>
    Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;
