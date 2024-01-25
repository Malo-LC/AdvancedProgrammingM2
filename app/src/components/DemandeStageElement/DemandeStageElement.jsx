import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";

import PropTypes from "prop-types";

import "./demandestageelement.css";
import Status from "../BasicComponents/Status/Status";

DemandeStageElement.propTypes = {
  internship_name: PropTypes.string.isRequired,
  internship_year: PropTypes.string.isRequired,
  internship_request_status: PropTypes.string.isRequired,
  internship_company_name: PropTypes.string.isRequired,
  internship_begin_date: PropTypes.string.isRequired,
  internship_end_date: PropTypes.string.isRequired,
  internship_id: PropTypes.number.isRequired,
  student_name: PropTypes.string,
  userRole: PropTypes.string,
};

function DemandeStageElement(props) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileElementHeight = props.userRole === "STUDENT" ? 130 : 90;

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <>
      {isMobile ? (
        <motion.div className="requestelement-mobile">
          {/* <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
            <div className="elements text-xl">{internship_name}</div>
            <div className="elements">
              <Status status={internship_request_status} />
            </div>
          </button>
          <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
            {isExpanded && (
              <>
                {userRole === "TUTOR" && (
                  <div className="elements-hidden">
                    <p className="mr-2">Nom étudiant :</p>
                    <p className="font-thin">{student_name}</p>
                  </div>
                )}
                <div className="elements-hidden">
                  <p className="mr-2">Date de rendue :</p>
                  <p className="font-thin">{deadline}</p>
                </div>
                <div className="elements-hidden space-x-1 mt-1">
                  <p className="mr-2">Validations :</p>
                  <div className="flex flex-row space-x-2">
                    <ValidationBubble validationStatus="validated" firstname="Stephane" lastname="Plaza" />
                    <ValidationBubble validationStatus="notValidated" firstname="Didier" lastname="Bourdon" />
                    <ValidationBubble validationStatus="notTreated" firstname="Didier" lastname="Bourdon" />
                  </div>
                </div>
                <div className="w-full flex justify-center mt-2">
                  {userRole === "STUDENT" && (
                    <>
                      <ActionButton status={status} />
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div> */}
        </motion.div>
      ) : (
        <div className="flex flex-row items-center space-x-2 ">
          <div className={`requestelement justify-between w-full `}>
            <div className="elements">{props.internship_year}</div>
            <Status status={props.internship_request_status} />
            <div className="elements">{props.internship_status}</div>
            {props.userRole === "TUTOR" && <div className="elements">{props.student_name}</div>}
            <div className="elements">{props.internship_name}</div>
            <div className="elements">{props.internship_company_name}</div>
            <div className="elements">{props.internship_begin_date}</div>
            <div className="elements">{props.internship_end_date}</div>
            <div><a>Lien</a></div>
          </div>
        </div>
      )}
    </>
  )
}

export default DemandeStageElement;