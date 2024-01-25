import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import userService from "./services/userService";
import { useEffect } from "react";
import api from "./utils/api";

const RestrictedRoute = ({ children, ...rest }) => {
  const isAuthenticated = userService.isAuthentified();
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
