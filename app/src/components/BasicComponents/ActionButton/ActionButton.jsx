import PropTypes from "prop-types";
import api from "../../../utils/api";
import { readFileAsync } from "../../../utils/authDataService";
import "./actionbutton.css";
import { toast } from "react-toastify";

function ActionButton({ status, internShip, file, onDone, disabled }) {
  const handleButtonClick = () => {
    if (!file || internShip.tutorInternship.isValidated === false || !internShip.tutorSchool.isValidated === false) {
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
        if (response.ok) {
          toast.success("Fichier soumis");
          onDone();
          return;
        }
        toast.error("Erreur lors de la soumission du fichier");
      } catch (error) {
        toast.error("Erreur lors de la soumission du fichier");
      }
    }
  };

  return (
    <div>
      <button
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick();
        }}
        className={`action-button disabled:cursor-not-allowed ${
          status === false || internShip.tutorInternship.isValidated === false || internShip.tutorSchool.isValidated === false
            ? " upload"
            : " download-button"
        }`}
      >
        {status === false || internShip.tutorInternship.isValidated === false || internShip.tutorSchool.isValidated === false
          ? "Soumettre"
          : "Telecharger"}
      </button>
      {(!file || internShip.tutorInternship.isValidated === false || internShip.tutorSchool.isValidated === false) && (
        <input id="fileInput" type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => handleFileChange(e)} />
      )}
    </div>
  );
}

ActionButton.propTypes = {
  status: PropTypes.bool.isRequired,
  internShip: PropTypes.object.isRequired,
  file: PropTypes.string,
  onDone: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ActionButton;
