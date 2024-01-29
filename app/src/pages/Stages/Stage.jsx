import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import api from "../../utils/api";

//style
import "./stages.css";
import {useMediaQuery} from "react-responsive";
import StageElement from "../../components/StageElement/StageElement.jsx";


function Stages() {
  const controls = useAnimation();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  let internshipColumn= ["Intitulé du stage", "Date du début", "Date de fin", "Société", "Action", "Status"];

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
      <div className={`stages ${isMobile ? "items-start" : "items-center justify-center"}`}>
        <motion.div
            className={`stages-header ${isMobile ? "flex-col" : "flex-row"}`}
            initial={{ x: "-300%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <p className="stages-title">Mon stage</p>
        </motion.div>
        <div className="table">
          {isMobile === false && (
              <div className="table-title">
                {userRole &&
                    internshipColumn.map((item, index) => (
                        <div className="font-semibold text-center" key={index}>
                          {item}
                        </div>
                    ))}
              </div>
          )}


          <div className={`stages-container ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px]"}`}>
            <StageElement title="Stage M2" startInternship="02/08/24" endInternship="02/08/24" company="hugod only fan"
                        action="to be changed" status="to be changed"/>
          </div>
        </div>
      </div>
  );
}

export default Stages;
