import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Searchbar from "../../components/BasicComponents/SearchBar/SearchBar";
import DocElement from "../../components/DocElement/DocElement";
import EmptyState from "../../components/EmptyState/EmptyState.jsx";
import { docColumnNamesStudent, docColumnNamesTutor } from "../../constants/tableItems";
import userService from "../../services/userService";
import api from "../../utils/api";

//style
import DocViewer from "../../components/DocViewer/DocViewer";
import "./documents.css";

function Documents() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [documents, setDocuments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [pdfSelected, setPdfSelected] = useState("");

  const userRole = userService.getRole();

  useEffect(() => {
    controls.start({ y: 0 });
    getDocs();
  }, []);

  const getDocs = () => {
    api.get("submit/all").then((res) => {
      setDocuments(res);
    });
  };

  const handleOpenViewer = (selectedDoc) => {
    setPdfSelected(selectedDoc);
    setIsDocViewerOpen(true);
  };

  let docColumn;
  if (userRole === "STUDENT") {
    docColumn = docColumnNamesStudent;
  } else if (userRole === "TUTOR") {
    docColumn = docColumnNamesTutor;
  } else {
    docColumn = [];
  }

  return (
    <div className={`documents ${isMobile ? "items-start" : "items-center justify-center"}`}>
      <motion.div
        className={`documents-header ${isMobile ? "flex-col" : "flex-row"}`}
        initial={{ x: "-300%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <p className="document-title">Mes Documents</p>
        <div className="flex flex-row">
          <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
      </motion.div>
      <div className="table">
        {isMobile === false && (
          <div className="table-title">
            {docColumn.map((item) => (
              <div className="font-semibold text-center" key={item}>
                {item}
              </div>
            ))}
          </div>
        )}
        <div className={`doc-container ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px]"}`}>
          {documents.length === 0 && (
            <div className="text-center">
              <EmptyState type="document" />
            </div>
          )}
          {documents
            .filter(
              (doc) =>
                doc.reportName?.toLowerCase().includes(searchInput.toLowerCase()) ||
                doc.deadline?.toLowerCase().includes(searchInput.toLowerCase()) ||
                doc.userId?.firstName?.toLowerCase().includes(searchInput.toLowerCase()) ||
                doc.userId.lastName?.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((item) => (
              <DocElement onDone={getDocs} key={item.reportId} internShip={item} userRole={userRole} onOpenViewer={handleOpenViewer} />
            ))}
        </div>
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

export default Documents;
