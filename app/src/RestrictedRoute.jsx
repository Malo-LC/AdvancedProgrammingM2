import React from "react";
import { Route, Navigate } from "react-router-dom";

const RestrictedRoute = ({ children, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RestrictedRoute;
