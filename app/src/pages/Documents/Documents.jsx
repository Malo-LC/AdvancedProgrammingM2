import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Searchbar from "../../components/BasicComponents/SearchBar/SearchBar";
import DocElement from "../../components/DocElement/DocElement";
import userService from "../../services/userService";
import api from "../../utils/api";
import { useMediaQuery } from "react-responsive";

//style
import "./documents.css";

const docColumnNamesTutor = ["Nom du document", "Deadline", "Nom de l'élève", "Validation", "Status"];
const docColumnNamesStudent = ["Nom du document", "Deadline", "Intitulé du stage", "Validation", "Status", "Action"];

function Documents() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  let docColumn;

  useEffect(() => {
    controls.start({ y: 0 });
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          // const userInfo = await userService.getUserInfo();
          const userRole = await userService.getRole();
          // if (userInfo) {
          //   setUser(userInfo);
          // }
          if (userRole) {
            setUserRole(userRole);
          }
        } catch (error) {
          console.log("Error fetching user info: ", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  if (userRole === "STUDENT") {
    docColumn = docColumnNamesStudent;
  } else if (userRole === "TUTOR") {
    docColumn = docColumnNamesTutor;
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
          <Searchbar />
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
          <DocElement name="Rapport de stage" deadline="02/08/24" student_name="Don Diego" validation="test" status="delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="not_delivered" userRole={userRole} />
        </div>
      </div>
    </div>
  );
}

export default Documents;
