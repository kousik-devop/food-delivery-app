import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true; // globally
// axios defaults (baseURL, withCredentials) are set in src/axiosConfig.js


const Login = () => {

  const { login, user, loadingUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log("[DEBUG] Login form submit", JSON.stringify(formData));

    // quick client-side validation
    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "/api/auth/user/login",
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);


  // The server sets the cookie. The context will pick it up.
      login(response.data.user); // Update context
      
      setMessage("✅ Login successful!");
      // Redirect after login (example: homepage)
      navigate("/");
    } catch (error) {      
      console.error("[DEBUG] Login error:", error?.response || error);
      setMessage((error.response?.data?.message || "Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  // If user is already authenticated, redirect to home
  useEffect(() => {
    if (!loadingUser && user) {
      navigate('/');
    }
  }, [user, loadingUser, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors duration-200"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}

        <div className="mt-6 text-sm">
          <Link
            to="/user/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            New here? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
