import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import userService from "../../services/userService";

//style
import api from "../../utils/api";
import "./internship.css";

function Stages() {
  const controls = useAnimation();

  const [internship, setInternship] = useState(null);
  const userRole = userService.getRole();

  useEffect(() => {
    controls.start({ y: 0 });
    api.get("studentInternship/all").then((res) => {
      setInternship(res);
    });
  }, []);

  // let requestColumn;
  // let requestKey;

  // if (userRole === "STUDENT") {
  //   requestColumn = requestColumnNamesStudent;
  //   requestKey = requestKeyStudent;
  // }

  return (
    <div className="stages">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
        <p className="stage-title">Mes stages</p>
      </motion.div>
      <div className="h-full">
        <table className="w-[800px]">
          <thead>
            <tr className="">
              <th className="mx-2">Company Name</th>
              <th className="mx-2">Mission</th>
              <th className="mx-2">End Date</th>
              <th className="mx-2">Action</th>
              <th className="mx-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {internship && (
              <tr className="">
                <td className="mx-2">{internship[0].companyName}</td>
                <td className="mx-2">{internship[0].mission}</td>
                <td className="mx-2">{internship[0].endDate}</td>
                <td className="mx-2">{internship[0].companyName}</td>
                <td className="mx-2">{internship[0].isInternshipValidated === true ? "validated" : "pending"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <motion.div className="metric-container">{userRole === "" && <div className=""></div>}</motion.div> */}
    </div>
  );
}

export default Stages;
