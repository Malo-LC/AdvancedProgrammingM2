import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Searchbar from "../../components/BasicComponents/SearchBar/SearchBar";
import DocElement from "../../components/DocElement/DocElement";
import userService from "../../services/userService";
import api from "../../utils/api";

//style
import "./documents.css";

const docColumnNamesAdmin = ["Nom du document", "Deadline", "Nom de l'élève", "Validation", "Status"];
const docColumnNamesStudent = ["Nom du document", "Deadline", "Intitulé du stage", "Validation", "Status", "Action"];

function Documents() {
  const controls = useAnimation();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  let docColumn;

  useEffect(() => {
    controls.start({ y: 0 });
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          const userInfo = await userService.getUserInfo();
          const userRole = await userService.getRole();
          if (userInfo) {
            setUser(userInfo);
          }
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
  } else if (userRole === "ADMIN") {
    docColumn = docColumnNamesAdmin;
  }

  return (
    <div>
      <motion.div className="page-header" initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
        <p className="document-title">Mes Documents</p>
        <div className="flex flex-row">
          <Searchbar />
        </div>
      </motion.div>
      <div className="table">
        <div className="table-title">
          {userRole &&
            docColumn.map((item, index) => (
              <div className="font-semibold w-[150px] text-center" key={index}>
                {item}
              </div>
            ))}
        </div>
        <div className="doc-container">
          <DocElement name="test" deadline="01/01/01" student_name="test" validation="test" status="delivered" userRole={userRole} />
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
