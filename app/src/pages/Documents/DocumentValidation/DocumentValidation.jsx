import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../../../utils/api";

function DocumentValidation() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    controls.start({ y: 0 });
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get("submit/all");
      setDocuments(response || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleApproval = async (submitId) => {
    try {
      const response = await api.put(`submit/approve/${submitId}`, { isApproved: true });
      console.log(response);
      fetchDocuments();
    } catch (error) {
      console.error("Error approving document:", error);
    }
  };

  const handleRejection = async (submitId) => {
    try {
      const response = await api.put(`submit/approve/${submitId}`, { isApproved: false });
      console.log(response);
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  return (
    <div className={`documents ${isMobile ? "items-start" : "items-center justify-center"}`}>
      <motion.div
        className={`documents-header ${isMobile ? "flex-col" : "flex-row"}`}
        initial={{ x: "-300%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <p className="document-title">Mes demandes de validation</p>
      </motion.div>
      <div className="flex flex-col space-y-4">
        {documents.map((item, index) => (
          <div key={index} className="flex flex-row space-x-4">
            <p>{item.reportName}</p>
            <p>tutor school validation:</p>
            <p>tutor company validation: {item.tutorInternship.isValidated === null ? "not treated" : "treated"}</p>
            <div className="flex flex-row space-x-2 ">
              <button onClick={() => handleApproval(item.submitId)} className="border border-gray-200 bg-green-200 p-1">
                accepter
              </button>
              <button onClick={() => handleRejection(item.submitId)} className="border border-gray-200 bg-red-200 p-1">
                refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentValidation;
