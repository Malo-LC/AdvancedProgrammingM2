import React from 'react';
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import userService from "../../services/userService";
import api from "../../utils/api";

import DemandeStageElement from '../../components/DemandeStageElement/DemandeStageElement';


const requestColumnNamesTutor = ["Année du Stage", "Statut", "Nom de l'étudiant", "Intitulé du Stage", "Nom de la société", "Début", "Fin", "Action"];
const requestColumnNamesStudent = ["Année du Stage", "Statut", "Intitulé du Stage", "Nom de la société", "Début", "Fin", "Action"];

function Demandes() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    controls.start({ y: 0 });
    api.get("studentInternship/all").then((res) => {
      setRequests(res);
    });
    const fetchUserInfo = async () => {
      const userRole = await userService.getRole();
      setUserRole(userRole);
    };
    fetchUserInfo();
  }, []);

  let requestColumn;

  if (userRole === "STUDENT") {
    requestColumn = requestColumnNamesStudent;
  } else if (userRole === "TUTOR") {
    requestColumn = requestColumnNamesTutor;
  }

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
        {isMobile === false && (
          <div className="table-title">
            {userRole &&
              requestColumn.map((item, index) => (
                <div className="font-semibold text-center" key={index}>
                  {item}
                </div>
              ))}
          </div>
        )}
        <div className={`doc-container ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px]"}`}>
          {requests.map((item, key) => (
            <DemandeStageElement
              internship_status={item.isInternshipValidated}
              internship_name={item.mission}
              internship_year={item.year}
              internship_company_name={item.companyName}
              internship_begin_date={item.startDate}
              internship_end_date={item.endDate}
              internship_id={1}
              student_name={item.mission}
              userRole={userRole}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Demandes;