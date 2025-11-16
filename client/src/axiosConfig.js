import axios from "axios";

// Determine API base URL based on environment
// In development: use relative path so Vite proxy forwards to localhost:3000
// In production: use backend URL from env var or fallback to Render instance
const getBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    // Dev mode: use relative path so Vite proxy handles routing
    return 'http://localhost:3000';
  }
  // Production: use backend URL from environment or default to Render
  return import.meta.env.VITE_API_URL || 'https://food-delivery-app-sfgf.onrender.com';
};

export default axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

