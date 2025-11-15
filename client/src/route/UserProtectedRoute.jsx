import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const UserProtectedRoute = () => {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/prelogin" />;
};

export default UserProtectedRoute;
