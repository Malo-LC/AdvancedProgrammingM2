import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Searchbar from "../../components/BasicComponents/SearchBar/SearchBar";
import DocElement from "../../components/DocElement/DocElement";
import userService from "../../services/userService";
import api from "../../utils/api";

//style
import "./documents.css";

const docColumnNamesTutor = ["Nom du document", "Deadline", "Nom de l'élève", "Validation", "Status"];
const docColumnNamesStudent = ["Nom du document", "Deadline", "Intitulé du stage", "Validation", "Status", "Action"];

function Documents() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const userRole = userService.getRole();
  const [documents, setDocuments] = useState([]);

  //search
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    controls.start({ y: 0 });
    api.get("submit/all").then((res) => {
      setDocuments(res);
      setFilteredItems(res);
    });
  }, []);

  const handleInputChange = () => {
    const filteredDocs = documents.filter((doc) => doc.reportName.toLowerCase().includes(searchInput.toLowerCase()));

    const fileToReturn = searchInput.length === 0 ? documents : filteredDocs;
    console.log(searchInput.length);

    setFilteredItems(fileToReturn);
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
            {userRole &&
              docColumn.map((item, index) => (
                <div className="font-semibold text-center" key={index}>
                  {item}
                </div>
              ))}
          </div>
        )}
        <div className={`doc-container ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px]"}`}>
          {documents
            .filter(
              (doc) =>
                doc.reportName.toLowerCase().includes(searchInput.toLowerCase()) || doc.deadline.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((item, key) => (
              <DocElement key={key} internShip={item} student_name="test" userRole={userRole} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Documents;
