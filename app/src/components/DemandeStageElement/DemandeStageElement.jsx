import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import Status from "../BasicComponents/Status/Status";
import TableComponent from "../TableComponent/TableComponent";
import DemandeMobileComponent from "../DemandeMobileComponent/DemandeMobileComponent";
import { requestColumnNamesStudent, requestColumnNamesTutor, requestKeyStudent, requestKeyTutor } from "../../constants/tableItems";

import "./demandestageelement.css";

DemandeStageElement.propTypes = {
  userRole: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
};

function DemandeStageElement({ userRole, requests }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  let requestColumn;
  let requestKey;

  if (userRole === "STUDENT") {
    requestColumn = requestColumnNamesStudent;
    requestKey = requestKeyStudent;
  } else if (userRole === "TUTOR") {
    requestColumn = requestColumnNamesTutor;
    requestKey = requestKeyTutor;
  } else {
    requestColumn = requestColumnNamesStudent;
    requestKey = requestKeyStudent;
  }

  // Convert the data to the format of the table
  const internships = requests.map((objet) => ({
    internship_year: objet.internshipYear,
    internship_status: <Status status={objet.isInternshipValidated} type="demande" />,
    internship_name: objet.mission,
    company_name: objet.companyName,
    start_date: objet.startDate,
    end_date: objet.endDate,
    internship_id: objet.internshipId,
    student_name: `${objet.studentFirstname} ${objet.studentFirstname}`,
    link: <>Consulter</>,
  }));

  return (
    <>
      {isMobile ? (
        <>
          <DemandeMobileComponent data={internships} />
        </>
      ) : (
        <>
          <TableComponent columns={requestColumn} internships={internships} dataKeys={requestKey} />
        </>
      )}
    </>
  );
}

export default DemandeStageElement;
