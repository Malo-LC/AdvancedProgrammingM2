import React from "react";
import PropTypes from "prop-types";

import "./actionbutton.css";

function ActionButton({ status }) {
  return (
    <div>
      <button className={`action-button ${status === "delivered" ? "download" : "upload"}`}>
        {status === "delivered" ? "Télécharger" : "Soumettre"}
      </button>
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ActionButton;
