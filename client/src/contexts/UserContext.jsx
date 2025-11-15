// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Silent login on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // server exposes the authenticated user at /api/auth/user/me
        const res = await axios.get("/api/auth/user/me");
        setUser(res.data.user);
      } catch (err) {
        console.debug("Silent auth failed:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await axios.post("https://food-delivery-app-sfgf.onrender.com/api/auth/user/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
