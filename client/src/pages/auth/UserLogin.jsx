import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const { login, user, loadingUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(response.data.user); // store user in context
      setMessage("✅ Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (!loadingUser && user) {
      navigate("/");
    }
  }, [user, loadingUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-red-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-red-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}

        <div className="mt-6 text-sm">
          <Link to="/user/register" className="text-blue-500 font-semibold">
            New here? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
