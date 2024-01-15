import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const RestrictedRoute = ({ children, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
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
