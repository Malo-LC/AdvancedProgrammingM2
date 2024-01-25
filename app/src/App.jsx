import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RestrictedRoute from "./RestrictedRoute";
import Profile from "./pages/Profile/Profile";
import Documents from "./pages/Documents/Documents";
import Stage from "./pages/Stages/Stage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import userService from "./services/userService";
import api from "./utils/api";
import Demandes from "./pages/Demande/Demande";
import InternshipSettings from "./pages/InternshipSettings/InternshipSettings";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
      userService.getRole();
    } else {
      navigate("/");
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
          <RestrictedRoute>
            <Home />
          </RestrictedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <RestrictedRoute>
            <Profile />
          </RestrictedRoute>
        }
      />
      <Route
        path="/demandes"
        element={
          <RestrictedRoute>
            <Documents />
          </RestrictedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <RestrictedRoute>
            <Documents />
          </RestrictedRoute>
        }
      />
      <Route
        path="/stages"
        element={
          <RestrictedRoute>
            <Stage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/admin/demandes"
        element={
          <RestrictedRoute>
            <Demandes />
          </RestrictedRoute>
        }
      />
      <Route
        path="/parametres/stages"
        element={
          <RestrictedRoute>
            <InternshipSettings />
          </RestrictedRoute>
        }
      />
      <Route
        path="/tuteur/demandes"
        element={
          <RestrictedRoute>
            <Demandes />
          </RestrictedRoute>
        }
      />
    </Routes>
  );
}

export default App;
