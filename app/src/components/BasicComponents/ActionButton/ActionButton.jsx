import PropTypes from "prop-types";
import api from "../../../utils/api";
import { readFileAsync } from "../../../utils/authDataService";
import "./actionbutton.css";

function ActionButton({ status, internShip }) {
  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const rawBody = await readFileAsync(file);

    if (file) {
      try {
        // const base64Data = await readFileAsync(file);
        // formData.append("base64File", base64Data);
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
      {status === false && <input id="fileInput" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />}
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.bool.isRequired,
  internShip: PropTypes.object.isRequired,
};

export default ActionButton;
