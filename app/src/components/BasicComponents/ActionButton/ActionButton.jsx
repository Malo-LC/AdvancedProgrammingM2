import React from "react";
import PropTypes from "prop-types";

import "./actionbutton.css";

function ActionButton({ status }) {
  const handleButtonClick = () => {
    // Additional logic for the button click
  };
  return (
    <div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick();
        }}
        className={`action-button ${status === true ? "download" : "upload"}`}
      >
        {status === true ? "Télécharger" : "Soumettre"}
      </button>
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default ActionButton;
