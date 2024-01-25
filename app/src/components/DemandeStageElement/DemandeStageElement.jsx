import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";

import ActionButton from "../BasicComponents/ActionButton/ActionButton";

import PropTypes from "prop-types";

import "./demandestageelement.css";
import Status from "../BasicComponents/Status/Status";

DemandeStageElement.propTypes = {
  internship_name: PropTypes.string.isRequired,
  internship_year: PropTypes.string.isRequired,
  internship_status: PropTypes.bool.isRequired,
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
          <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
            <div className="elements text-xl">{props.internship_name}</div>
            <div className="elements">
              <Status status={props.internship_status} type="demande" />
            </div>
          </button>
          <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
            {isExpanded && (
              <>
                {props.userRole === "TUTOR" && (
                  <div className="elements-hidden">
                    <p className="mr-2">Nom étudiant :</p>
                    <p className="font-thin">{props.student_name}</p>
                  </div>
                )}
                <div className="elements-hidden">
                  <p className="mr-2">Nom de la société :</p>
                  <p className="font-thin">{props.internship_company_name}</p>
                </div>
                <div className="elements-hidden">
                  <p className="mr-2">Date de début :</p>
                  <p className="font-thin">{props.internship_begin_date}</p>
                </div>
                <div className="elements-hidden">
                  <p className="mr-2">Date de fin :</p>
                  <p className="font-thin">{props.internship_end_date}</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-row items-center space-x-2 ">
          <div className={`requestelement justify-between w-full `}>
            <div className="elements">{props.internship_year}-{props.internship_year+1}</div>
            <Status status={props.internship_status} type={"demande"} />
            <div className="elements">{props.internship_status}</div>
            {props.userRole === "TUTOR" && <div className="elements">{props.student_name}</div>}
            <div className="elements">{props.internship_name}</div>
            <div className="elements">{props.internship_company_name}</div>
            <div className="elements">{props.internship_begin_date}</div>
            <div className="elements">{props.internship_end_date}</div>
            <div><a>Consulter</a></div>
          </div>
        </div>
      )}
    </>
  )
}

export default DemandeStageElement;