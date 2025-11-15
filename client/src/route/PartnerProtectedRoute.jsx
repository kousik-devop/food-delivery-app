import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePartner } from "../contexts/PartnerContext";
 
const PartnerProtectedRoute = () => {
  const { partner, token } = usePartner();
 

 
  return  partner ? <Outlet /> : <Navigate to="/food-partner/login" />;
};
 
export default PartnerProtectedRoute;