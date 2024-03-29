import { useState } from "react";
import { motion } from "framer-motion";

import PropTypes from "prop-types";

DemandeMobileComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

function DemandeMobileComponent(props /* data */) {
  const userRole = props.userRole;
  if (userRole === null) {
    return <></>;
  }

  const mobileIndex = props.mobileIndex;

  const [isExpanded, setIsExpanded] = useState(false);
  const mobileElementHeight = props.userRole === "STUDENT" ? 100 : 130;

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {props.data.map((val, key) => {
        return (
          <motion.div className="requestelement-mobile" key={key}>
            <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
              <div className="elements text-xl">{val.internship_name}</div>
              <div className="elements">{val.internship_status}</div>
            </button>
            <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
              {isExpanded && (
                <>
                  {props.userRole === "TUTOR" && (
                    <div className="elements-hidden">
                      <p className="mr-2">Etudiant : </p>
                      <p className="font-thin">{val.student_name}</p>
                    </div>
                  )}
                  <div className="elements-hidden">
                    <p className="mr-2">Société :</p>
                    <p className="font-thin">{val.company_name}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de début :</p>
                    <p className="font-thin">{val.start_date}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de fin :</p>
                    <p className="font-thin">{val.end_date}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">{val.link}</p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

export default DemandeMobileComponent;
