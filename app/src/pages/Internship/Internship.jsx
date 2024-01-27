import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import userService from "../../services/userService";

//style
import "./internship.css";

function Stages() {
  const controls = useAnimation();

  const user = userService.getUserInfo();
  const userRole = userService.getRole();

  useEffect(() => {
    controls.start({ y: 0 });
  }, []);

  return (
    <div className="stages">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="stage-title">
        <p>Mes stages</p>
      </motion.div>
      <motion.div className="metric-container">{userRole === "" && <div className=""></div>}</motion.div>
    </div>
  );
}

export default Stages;
