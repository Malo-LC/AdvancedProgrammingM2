import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../../../utils/api";
import ValidationElement from "../../../components/ValidationElement/ValidationElement.jsx";
import DocViewer from "../../../components/DocViewer/DocViewer";
import { toast } from "react-toastify";

function DocumentValidation() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [documents, setDocuments] = useState([]);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [pdfSelected, setPdfSelected] = useState("");

  useEffect(() => {
    controls.start({ y: 0 });
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get("submit/to-validate");
      setDocuments(response || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleAccept = async (submitId) => {
    try {
      const response = await api.put(`submit/approve/${submitId}`, { isApproved: true });
      toast.success("Document approuvé");
      fetchDocuments();
    } catch (error) {
      console.error("Error approving document:", error);
    }
  };

  const handleDecline = async (submitId) => {
    try {
      const response = await api.put(`submit/approve/${submitId}`, { isApproved: false });
      toast.success("Document refusé");
      fetchDocuments();
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  const handleOpenViewer = (selectedDoc) => {
    setPdfSelected(selectedDoc);
    setIsDocViewerOpen(true);
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
      <div className={`doc-container ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px] w-full"}`}>
        {documents.length === 0 && <div className="text-center">Aucun document à valider</div>}
        {documents.map((item, index) => (
          <ValidationElement key={index} document={item} onOpenViewer={handleOpenViewer} onAccept={handleAccept} onDecline={handleDecline} />
        ))}
      </div>
      {isDocViewerOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-4 border-slate-200 p-1 rounded-lg">
            <DocViewer file={pdfSelected} onCloseViewer={() => setIsDocViewerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentValidation;
