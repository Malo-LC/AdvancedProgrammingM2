import { CheckCircle } from "react-feather";
import { AlertTriangle } from "react-feather";

//style
import "./status.css";
import PropTypes from "prop-types";

function Status({ status, type }) {
  let icon, text, colorClass;

  if (status === true && type === "document") {
    icon = <CheckCircle className="text-white" />;
    text = "Remis";
    colorClass = "bg-[#5CBF92]";
  } else if (status === false && type === "document") {
    icon = <AlertTriangle className="text-white" />;
    text = "Non remis";
    colorClass = "bg-[#DF3A3A]";
  } else if (status === false && type === "demande") {
    icon = <AlertTriangle className="text-white" />;
    text = "Refusé";
    colorClass = "bg-[#DF3A3A]";
  } else if (status === true && type === "demande") {
    icon = <AlertTriangle className="text-white" />;
    text = "Accepté";
    colorClass = "bg-[#DF3A3A]";
  } else if (status === null && type === "demande") {
    text = "En attente";
    colorClass = "bg-[#cccccc]";
  }

  return (
    <div className={`status ${colorClass}`}>
      {icon}
      <p className={`${status === null ? "text-[#4A4545]" : "text-white"} font-extralight`}>{text}</p>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Status;
