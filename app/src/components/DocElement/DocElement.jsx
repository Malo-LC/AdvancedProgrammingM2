import Status from "../BasicComponents/Status/Status";
import ValidationBubble from "../BasicComponents/ValidationBubble/ValidationBubble";
import ActionButton from "../BasicComponents/ActionButton/ActionButton";

//style
import "./docelement.css";

function DocElement({ name, deadline, student_name, validation_name, status, userRole }) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className={`docelement justify-between ${userRole === "STUDENT" ? "w-[750px]" : "w-full"}`}>
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
      {userRole === "STUDENT" && (
        <>
          <ActionButton status={status} />
        </>
      )}
    </div>
  );
}

import PropTypes from "prop-types";

DocElement.propTypes = {
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  student_name: PropTypes.string,
  validation_name: PropTypes.string,
  status: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default DocElement;
