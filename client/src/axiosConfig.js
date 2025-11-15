import axios from "axios";


export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL  || 'https://food-delivery-app-sfgf.onrender.com',
  withCredentials: true,
});

