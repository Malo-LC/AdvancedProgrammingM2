import PropTypes from "prop-types";

import { useEffect, useRef } from "react";
import api from "../../../utils/api";
import "./actionbutton.css";

function ActionButton({ status, internShip }) {
  const fileInputRef = useRef(null);

  useEffect(() => {
    api.post(`upload/${studentInternshipId}`).then((res) => {
      setDocuments(res);
    });
  }, []);

  const handleButtonClick = () => {
    if (status === true) {
      console.log("button download");
    } else {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("test");
    }
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
      {status === false && <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />}
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.bool.isRequired,
  internShip: PropTypes.object.isRequired,
};

export default ActionButton;
