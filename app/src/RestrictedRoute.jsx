import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import userService from "./services/userService";

const RestrictedRoute = ({ children, ...rest }) => {
  const isAuthenticated = userService.isAuthentified();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default RestrictedRoute;
