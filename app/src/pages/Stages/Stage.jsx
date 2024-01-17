import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import api from "../../utils/api";

//style
import "./stages.css";

function Stages() {
  const controls = useAnimation();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    controls.start({ y: 0 });
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          const userInfo = await userService.getUserInfo();
          const userRole = await userService.getRole();
          if (userInfo) {
            setUser(userInfo);
          }
          if (userRole) {
            setUserRole(userRole);
          }
        } catch (error) {
          console.log("Error fetching user info: ", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="stages">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="title">
        <p>Mes stages</p>
      </motion.div>
      <motion.div className="metric-container">{userRole === "" && <div className=""></div>}</motion.div>
    </div>
  );
}

export default Stages;
