import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";

import ActionButton from "../BasicComponents/ActionButton/ActionButton";
import Status from "../BasicComponents/Status/Status";
import TableComponent from "../TableComponent/TableComponent";
import DemandeMobileComponent from "../DemandeMobileComponent/DemandeMobileComponent";

import PropTypes from "prop-types";

import "./demandestageelement.css";

// DemandeStageElement.propTypes = {
//   internship_name: PropTypes.string.isRequired,
//   internship_year: PropTypes.number.isRequired,
//   internship_status: PropTypes.bool.isRequired,
//   internship_company_name: PropTypes.string.isRequired,
//   internship_begin_date: PropTypes.string.isRequired,
//   internship_end_date: PropTypes.string.isRequired,
//   internship_id: PropTypes.number.isRequired,
//   student_name: PropTypes.string,
//   userRole: PropTypes.string,
// };

function DemandeStageElement(props) {
  const userRole = props.userRole;
  if (userRole === null) {
    console.log("DemandeStageElement: userRole is null");
    return (<></>);
  }

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const requestColumnNamesTutor = ["Année du Stage", "Statut", "Nom de l'étudiant", "Intitulé du Stage", "Nom de la société", "Début", "Fin", "Action"];
  const requestColumnNamesStudent = ["Année du Stage", "Statut", "Intitulé du Stage", "Nom de la société", "Début", "Fin", "Action"];
  const requestMobileIndexStudent = {
    internship_year: 0,
    internship_status: 1,
    internship_name: 2,
    company_name: 3,
    start_date: 4,
    end_date: 5,
    internship_id: 6,
    link: 7,
  };
  const requestMobileIndexTutor = {
    internship_year: 0,
    internship_status: 1,
    student_name: 2,
    internship_name: 3,
    company_name: 4,
    internship_begin_date: 5,
    internship_end_date: 6,
    internship_id: 7,
    link: 8,
  };


  let requestColumn;
  let requestMobileIndex;

  if (userRole === "STUDENT") {
    requestColumn = requestColumnNamesStudent;
    requestMobileIndex = requestMobileIndexStudent;
  } else if (userRole === "TUTOR") {
    requestColumn = requestColumnNamesTutor;
    requestMobileIndex = requestMobileIndexTutor;
  }

  // Convert the data to the format of the table
  const newInternshipsList = props.data.map(objet => {
    let newInternshipData;
    if (userRole === "STUDENT") {
      newInternshipData = [null, <Status status={objet.isInternshipValidated} type="demande" />, objet.mission, objet.companyName, objet.startDate, objet.endDate, <a href="">Consulter</a>];
    } else if (userRole === "TUTOR") {
      newInternshipData = [null, <Status status={objet.isInternshipValidated} type="demande" />, `${objet.studentFirstname} ${objet.studentFirstname}`, objet.mission, objet.companyName, objet.startDate, objet.endDate, <a href="">Consulter</a>];
    }

    if (newInternshipData.length === requestColumn.length) {
      return newInternshipData;
    } else {
      return null;
    }
  });

  return (
    <>
      {isMobile ? (
        <>
          <DemandeMobileComponent data={newInternshipsList} mobileIndex={requestMobileIndex} />
        </>
      ) : (
        <>
          <TableComponent columns={requestColumnNamesStudent} data={newInternshipsList} />
        </>
      )}
    </>
  )
}

export default DemandeStageElement;