import { useMediaQuery } from "react-responsive";
import Status from "../BasicComponents/Status/Status";
import TableComponent from "../TableComponent/TableComponent";

import "./internshipelement.css";

function InternshipElement(props) {
    const userRole = props.userRole;

    const isMobile = useMediaQuery({ maxWidth: 767 });

    // Those names are displayed in the table
    let internshipColumn= ["Intitulé du stage", "Date du début", "Date de fin", "Société", "Action", "Status"];

    // Those keys define the order of the data in the table
    const internshipKey = ["internship_year", "internship_status", "internship_name", "company_name", "start_date", "end_date", "internship_id", "link"];

    // Convert the data to the format of the table
    const newInternshipsList = props.data.map(objet => {
        let newInternshipData = {
            "mission": objet.mission,
            "start_date": objet.startDate,
            "end_date": objet.endDate,
            "company_name": objet.companyName,
            "link": <a href="">Consulter</a>,
            "internship_status": <Status status={objet.isInternshipValidated} type="demande"/>
        };

        return newInternshipData;
    });

    return (
        <>
            <TableComponent columns={internshipColumn} data={newInternshipsList} dataKeys={internshipKey} />
        </>
    )
}

import PropTypes from "prop-types";

InternshipElement.propTypes = {
    userRole: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};
export default InternshipElement;