import React from "react";
import { CheckCircle } from "react-feather";
import { AlertTriangle } from "react-feather";

//style
import "./status.css";
import PropTypes from "prop-types";

function Status({ status }) {
  return (
    <div className={`status ${status === "delivered" ? "bg-[#5CBF92]" : "bg-[#DF3A3A]"}`}>
      {status === "delivered" ? <CheckCircle className="text-white" /> : <AlertTriangle className="text-white" />}

      <p className="text-white font-extralight">{status === "delivered" ? "Remis" : "Non remis"}</p>
    </div>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
