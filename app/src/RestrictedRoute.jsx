import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import userService from "./services/userService";
import PropTypes from "prop-types";

const RestrictedRoute = ({ children, roles }) => {
  const isAuthenticated = userService.isAuthentified();
  const userRole = userService.getRole();

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
