import React from "react";
import Status from "../BasicComponents/Status/Status";

//style
import "./docelement.css";

function DocElement({ name, deadline, student_name, validation, status }) {
  return (
    <tr className="docelement">
      <td className="elements">{name}</td>
      <td className="elements font-thin">{deadline}</td>
      <td className="elements">{student_name}</td>
      <td className="elements">{validation}</td>
      <td className="elements">
        <Status status={status} />
      </td>
    </tr>
  );
}

import PropTypes from "prop-types";

DocElement.propTypes = {
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  student_name: PropTypes.string,
  validation: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default DocElement;
