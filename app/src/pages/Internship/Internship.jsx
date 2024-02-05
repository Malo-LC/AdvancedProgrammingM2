import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import userService from "../../services/userService";
import api from "../../utils/api";
import InternshipElement from "../../components/InternshipElement/InternshipElement.jsx";
import "./internship.css";
import { internshipColumn } from "../../constants/tableItems.jsx";

function Internship() {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const userRole = userService.getUserInfo();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    controls.start({ y: 0 });
    api.get("studentInternship/all").then((res) => {
      setRequests(res);
    });
  }, []);

  return (
    <div className={`internship ${isMobile ? "items-start" : "items-center justify-center"}`}>
      <motion.div
        className={`internship-header ${isMobile ? "flex-col" : "flex-row"}`}
        initial={{ x: "-300%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <p className="internship-title">Mon Stage</p>
      </motion.div>
      {isMobile === false && (
        <div className="table-title">
          {internshipColumn.map((item) => (
            <div className="font-semibold text-center" key={item}>
              {item}
            </div>
          ))}
        </div>
      )}
      <div className={`internship-container  ${isMobile ? "w-screen items-center px-10 h-[700px]" : "h-[550px] w-full"}`}>
        {requests.map((request, index) => (
          <InternshipElement internShip={request} userRole={userRole} key={index} />
        ))}
        {requests.length === 0 && <div className="text-center">Aucun stages</div>}
      </div>
    </div>
  );
}

export default Internship;
