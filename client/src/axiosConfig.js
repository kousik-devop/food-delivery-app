import axios from "axios";

// Determine API base URL based on environment
const getBaseURL = () => {
  const isDev = import.meta.env.MODE === "development";

  if (isDev) {
    // Local backend
    return "http://localhost:3000";
  }

  // Production backend (MUST set in Vercel!)
  return import.meta.env.VITE_API_URL;
};

// Create axios instance
const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// CRITICAL: Also sync defaults so React never uses wrong axios
axios.defaults.baseURL = instance.defaults.baseURL;
axios.defaults.withCredentials = true;

console.log("🔗 FINAL AXIOS BASE URL:", instance.defaults.baseURL);

export default instance;
