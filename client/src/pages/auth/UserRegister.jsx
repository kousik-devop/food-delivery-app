import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const inputData = {
      fullName: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      password: formData.password,
    };

    console.log("Register Form Data:", inputData);

    try {
      const response = await axios.post("/api/auth/user/register", inputData, {
        withCredentials: true,
      });
      setMessage("✅ User registered successfully!");
      console.log("Response:", response.data);

      // Only navigate on success
      setTimeout(() => {
        navigate("/user/login");
      }, 800);

    } catch (error) {
      console.error(error);

      // Improve error message readability
      if (error.response?.data?.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ Error registering user!");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Register</h2>

        <p className="text-sm text-gray-500 mb-4">
          Register as a food-partner
          <Link
            className="text-blue-500 font-semibold hover:underline ml-2"
            to={"/food-partner/register"}
          >
            food-partner
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold 
                    py-3 rounded-full transition-colors duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-sm">
          <Link
            to="/user/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
