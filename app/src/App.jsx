import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RestrictedRoute from "./RestrictedRoute";
import Profile from "./pages/Profile/Profile";
import Documents from "./pages/Documents/Documents";
import Internship from "./pages/Internship/Internship.jsx";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import api from "./utils/api";
import Demandes from "./pages/Demande/Demandes.jsx";
import InternshipSettings from "./pages/InternshipSettings/InternshipSettings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ListForm from "./pages/Form/ListForm.jsx";
import CreateForm from "./pages/Form/CreateForm.jsx";
import ListFormStudent from "./pages/Form/ListFormStudent.jsx";
import Soumission from "./pages/Soumission/Soumission.jsx";
import InternshipList from "./pages/Internship/InternshipList.jsx";
import DocumentValidation from "./pages/Documents/DocumentValidation/DocumentValidation.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <RestrictedRoute roles={["TUTOR", "STUDENT", "ADMIN"]}>
              <Home />
            </RestrictedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <RestrictedRoute roles={["TUTOR", "STUDENT", "ADMIN"]}>
              <Profile />
            </RestrictedRoute>
          }
        />
        <Route
          path="/tutor-register"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <Register />
            </RestrictedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <RestrictedRoute roles={["TUTOR", "STUDENT", "ADMIN"]}>
              <Documents />
            </RestrictedRoute>
          }
        />
        <Route
          path="/stages"
          element={
            <RestrictedRoute roles={["TUTOR", "STUDENT", "ADMIN"]}>
              <Internship />
            </RestrictedRoute>
          }
        />
        <Route
          path="/stages/liste"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <InternshipList />
            </RestrictedRoute>
          }
        />
        <Route
          path="/demandes"
          element={
            <RestrictedRoute roles={["ADMIN", "TUTOR", "STUDENT"]}>
              <Demandes />
            </RestrictedRoute>
          }
        />
        <Route
          path="/document-validation"
          element={
            <RestrictedRoute roles={["ADMIN", "TUTOR"]}>
              <DocumentValidation />
            </RestrictedRoute>
          }
        />
        <Route
          path="/parametres/stages"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <InternshipSettings />
            </RestrictedRoute>
          }
        />
        <Route
          path="/parametres/form"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <ListForm />
            </RestrictedRoute>
          }
        />
        <Route
          path="/parametres/form/create"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <CreateForm />
            </RestrictedRoute>
          }
        />
        <Route
          path="/parametres/form/edit/:id"
          element={
            <RestrictedRoute roles={["ADMIN"]}>
              <CreateForm />
            </RestrictedRoute>
          }
        />
        <Route
          path="/form"
          element={
            <RestrictedRoute roles={["STUDENT"]}>
              <ListFormStudent />
            </RestrictedRoute>
          }
        />
        <Route
          path="/soumettre"
          element={
            <RestrictedRoute roles={["STUDENT"]}>
              <Soumission />
            </RestrictedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
