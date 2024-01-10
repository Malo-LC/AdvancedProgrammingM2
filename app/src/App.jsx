import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import api from "./utils/api";
import RestrictedRoute from "./RestrictedRoute";
import userService from "./services/userService";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
      userService.getRole();
      navigate("/home");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <Home />
          // <RestrictedRoute>
          //   <Home />
          // </RestrictedRoute>
        }
      />
    </Routes>
  );
}

export default App;
