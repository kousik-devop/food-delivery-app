import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { usePartner } from "../../contexts/PartnerContext";

const FoodPartnerLogin = () => {
  const { login, partner } = usePartner();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect to dashboard once the partner state is updated
  useEffect(() => {
    if (partner) {
      navigate("/food-partner/dashboard");
    }
  }, [partner, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "/api/auth/food-partner/login",
        formData
      );

      console.log("Partner Login Response:", response.data);
      

      // The server sets the cookie. The context will pick it up.
      login(response.data.foodPartner);

      // The useEffect will handle the navigation now.
    } catch (error) {
      console.error('Partner login error:', error);
      setMessage("❌ Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Partner Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}

        <div className="mt-6 text-sm">
          <Link
            to="/food-partner/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
