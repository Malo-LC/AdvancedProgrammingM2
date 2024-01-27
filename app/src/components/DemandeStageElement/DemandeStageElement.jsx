import { useMediaQuery } from "react-responsive";
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
  const requestKeyTutor = ["internship_year", "internship_status", "student_name", "internship_name", "company_name", "start_date", "end_date", "internship_id", "link"];
  const requestKeyStudent = ["internship_year", "internship_status", "internship_name", "company_name", "start_date", "end_date", "internship_id", "link"];

  let requestColumn;
  let requestKey;

  if (userRole === "STUDENT") {
    requestColumn = requestColumnNamesStudent;
    requestKey = requestKeyStudent;
  } else if (userRole === "TUTOR") {
    requestColumn = requestColumnNamesTutor;
    requestKey = requestKeyTutor;
  }

  // Convert the data to the format of the table
  const newInternshipsList = props.data.map(objet => {
    let newInternshipData = {
      "internship_year": objet.internshipYear,
      "internship_status": <Status status={objet.isInternshipValidated} type="demande"/>,
      "internship_name": objet.mission,
      "company_name": objet.companyName,
      "start_date": objet.startDate,
      "end_date": objet.endDate,
      "internship_id": objet.internshipId,
      "link": <a href="">Consulter</a>
    };
    if (userRole === "TUTOR") {
      newInternshipData = {
        ...newInternshipData,
        "student_name": `${objet.studentFirstname} ${objet.studentFirstname}`
      };
    }

    return newInternshipData;
  });

  console.log("DemandeStageElement: newInternshipsList = ", newInternshipsList);

  return (
    <>
      {isMobile ? (
        <>
          <DemandeMobileComponent data={newInternshipsList} />
        </>
      ) : (
        <>
          <TableComponent columns={requestColumnNamesStudent} data={newInternshipsList} dataKeys={requestKey} />
        </>
      )}
    </>
  )
}

export default DemandeStageElement;