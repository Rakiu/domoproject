import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const admin = useSelector((s) => s.auth.admin);
  const token = localStorage.getItem("token");

  // 🔐 Already logged in → dashboard
  if (admin || token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
