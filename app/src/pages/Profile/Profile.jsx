import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import userService from "../../services/userService.js";
import api from "../../utils/api.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          const userProfile = await userService.getUserProfile();
          const userRoleInfo = await userService.getRole();
          if (userProfile) {
            setUser(userProfile);
          }
        } catch (error) {
          console.error("Error fetching user info: ", error);
        }
      }
    };

    fetchUserInfo();
  }, []); // Le tableau vide garantit que l'effet s'exécute une seule fois après le premier rendu

  if (!user) {
    return <div>Loading...</div>; // Vous pouvez personnaliser ce chargement comme vous le souhaitez
  }

  return (
    <div className="h-screen items-center justify-center">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 10 }} className="title">
        <p>Mon profil</p>
      </motion.div>

      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full border-2 border-gray-300 w-24 h-24 mb-4"
              src="https://placehold.co/96x96.png"
              alt="{user.firstname} {user.lastname} profile picture"
            />
            <div className="text-lg font-semibold mb-2">{user.firstname}</div>
            <div className="text-lg font-semibold mb-2">{user.lastname}</div>
          </div>
        </div>
        <div className="bg-white m-10 p-6 rounded-lg shadow-lg w-5/12">
          <div className="mt-4">
            <div className="flex">
              <div className="w-1/3">
                <div className="font-semibold mb-2">Email</div>
                <div className="font-semibold mb-2">Téléphone</div>
                <div className="font-semibold mb-2">Adresse</div>
                <div className="font-semibold mb-2">Promotion</div>
                <div className="font-semibold mb-2">Majeur</div>
                <div className="font-semibold mb-2">Classe</div>
              </div>
              <div className="w-2/3">
                <div className="mb-2">{user.email}</div>
                <div className="mb-2">{user.phone}</div>
                <div className="mb-2">{user.address}</div>
                <div className="mb-2">{user.promotionYear}</div>
                <div className="mb-2">{user.major}</div>
                <div className="mb-2">{user.class}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
