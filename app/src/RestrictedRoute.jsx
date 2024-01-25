import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import userService from "./services/userService";
import { useEffect } from "react";
import api from "./utils/api";
import PropTypes from "prop-types";

const RestrictedRoute = ({ children, roles }) => {
  const isAuthenticated = userService.isAuthentified();
  const userRole = userService.getRole();

  useEffect(() => {
    api
      .get("user/me")
      .then((res) => {
        if (!res?.access_token) {
          api.disconnect();
        }
      })
      .catch(() => {
        api.disconnect();
      });
  }, []);

  if (!isAuthenticated || !roles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

RestrictedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RestrictedRoute;
