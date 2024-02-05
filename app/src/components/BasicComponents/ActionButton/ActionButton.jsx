import PropTypes from "prop-types";
import api from "../../../utils/api";
import { readFileAsync } from "../../../utils/authDataService";
import "./actionbutton.css";

function ActionButton({ status, internShip, file }) {
  const handleButtonClick = () => {
    if (!file) {
      const fileInput = document.getElementById("fileInput");
      fileInput.click();
    } else {
      handleDownload();
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = internShip.reportName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const rawBody = await readFileAsync(file);

    if (file) {
      try {
        const formData = {
          file: rawBody ? { base64: rawBody, name: file.name, type: file.type } : null,
          reportId: internShip.reportId,
        };
        const response = await api.post(`submit/upload/${internShip.studentInternshipId}`, formData);
        console.log("File upload successful", response);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick();
        }}
        className={`action-button ${status === true ? " download-button" : " upload"}`}
      >
        {status === true ? "Télécharger" : "Soumettre"}
      </button>
      {!file && <input id="fileInput" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />}
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.bool.isRequired,
  internShip: PropTypes.object.isRequired,
  file: PropTypes.string,
};

export default ActionButton;
