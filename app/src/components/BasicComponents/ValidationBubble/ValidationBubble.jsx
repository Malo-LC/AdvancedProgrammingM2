import React from "react";
import PropTypes from "prop-types";

import "./validationbubble.css";

function ValidationBubble({ firstname, lastname, validationStatus }) {
  const firstInitial = firstname ? firstname.charAt(0) : "";
  const lastInitial = lastname ? lastname.charAt(0) : "";

  let bubbleStyle = "w-8 h-8 rounded-full flex flex-row justify-center items-center border-2 text-sm";

  switch (validationStatus) {
    case "validated":
      bubbleStyle += " bg-[#E4F8EE] border-[#5CBF92] text-[#5CBF92]";
      break;
    case "notValidated":
      bubbleStyle += " bg-[#FEE8E1] border-[#F1582A] text-[#F1582A]";
      break;
    case "notTreated":
      bubbleStyle += " bg-[#CCCCCC] border-[#8A8686] text-[#8A8686]";
      break;
    default:
      break;
  }

  return (
    <div className={`bubble ${bubbleStyle}`}>
      <p>{firstInitial}</p>
      <p>{lastInitial}</p>
    </div>
  );
}

ValidationBubble.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  validationStatus: PropTypes.string.isRequired,
};

export default ValidationBubble;
