import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const admin = useSelector((s) => s.auth.admin);
  const token = localStorage.getItem("token");

  if (!admin && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
