import axios from "axios";


export default axios.create({
  baseURL:'https://food-delivery-app-sfgf.onrender.com',
  withCredentials: true,
});

