// axiosService.js
import axios from "axios";

// Create an instance of Axios for centralized configuration
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:4000" // Local backend during development
    : "https://dineathomebackend.vercel.app", // Production backend
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


// You can add interceptors here if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request before sending it, e.g., attach tokens, etc.
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here globally, e.g., show error notification
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Unauthorized access - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
