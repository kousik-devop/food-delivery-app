import axios from "axios";

// Determine API base URL based on environment
const getBaseURL = () => {
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
