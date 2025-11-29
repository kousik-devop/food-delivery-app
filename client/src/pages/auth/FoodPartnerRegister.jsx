import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    restaurantName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle register submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // const inputData = {
    //   ownerName: formData.ownerName,
    //   restaurantName: formData.restaurantName,
    //   phone: formData.phone,
    //   address: formData.address,
    //   email: formData.email,
    //   password: formData.password,
    // };

    console.log("Partner Register Data:", formData);

    try {
      const response = await axios.post(
        "/api/auth/food-partner/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage("✅ Partner registered successfully!");
      console.log("Response:", response.data);
      navigate("/food-partner/login");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error registering partner!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Partner Register
        </h2>

        <p className="text-sm text-gray-500 mb-4">Register as a User <Link className="text-blue-500 font-semibold hover:underline ml-2" to={"/user/register"}>User register</Link></p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Full Name"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Owner Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="address"
            placeholder="Restaurant Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="3"
            required
          ></textarea>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full transition-colors duration-200"
          >
            {loading ? "Registering..." : "Register as Partner"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}

        <div className="mt-6 text-sm">
          <Link
            to="/food-partner/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegisterPage;
