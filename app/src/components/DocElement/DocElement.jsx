import React from "react";
import Status from "../BasicComponents/Status/Status";
import ValidationBubble from "../BasicComponents/ValidationBubble/ValidationBubble";

//style
import "./docelement.css";

function DocElement({ name, deadline, student_name, validation_name, status }) {
  return (
    <div className="docelement justify-between mr-[100px]">
      <div className="elements">{name}</div>
      <div className="elements font-thin">{deadline}</div>
      <div className="elements">{student_name}</div>
      <div className="elements space-x-1">
        <ValidationBubble validationStatus="validated" firstname="Stephane" lastname="Plaza" />
        <ValidationBubble validationStatus="notValidated" firstname="Didier" lastname="Bourdon" />
        <ValidationBubble validationStatus="notTreated" firstname="Didier" lastname="Bourdon" />
      </div>
      <div className="elements">
        <Status status={status} />
      </div>
    </div>
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
