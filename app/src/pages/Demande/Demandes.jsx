import React from 'react';
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import userService from "../../services/userService";
import api from "../../utils/api";

import DemandeStageElement from '../../components/DemandeStageElement/DemandeStageElement';


function Demandes() {

  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const userRole = userService.getRole();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    controls.start({ y: 0 });
    api.get("studentInternship/all").then((res) => {
      setRequests(res);
    });
  }, []);

  return (
    <div className={`documents ${isMobile ? "items-start" : "items-center justify-center"}`}>
      <motion.div
        className={`documents-header ${isMobile ? "flex-col" : "flex-row"}`}
        initial={{ x: "-300%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <p className="document-title">Mes Demandes de Stage</p>
      </motion.div>
      <div className="table">
        <DemandeStageElement userRole={userRole} data={requests} />
      </div>
    </div>
  )
}

export default Demandes;