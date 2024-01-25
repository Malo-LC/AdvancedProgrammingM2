import Status from "../BasicComponents/Status/Status";
import ValidationBubble from "../BasicComponents/ValidationBubble/ValidationBubble";
import ActionButton from "../BasicComponents/ActionButton/ActionButton";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { motion } from "framer-motion";

//style
import "./docelement.css";

function DocElement({ name, deadline, student_name, internship_name, status, userRole }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileElementHeight = userRole === "STUDENT" ? 130 : 90;

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isMobile ? (
        <motion.div className="docelement-mobile">
          <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
            <div className="elements text-xl">{name}</div>
            <div className="elements">
              <Status status={status} />
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
                {userRole === "STUDENT" && (
                  <div className="elements-hidden">
                    <p className="mr-2">Nom du stage :</p>
                    <p className="font-thin">{internship_name}</p>
                  </div>
                )}
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
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-row items-center space-x-2 ">
          <div className={`docelement justify-between w-full `}>
            <div className="elements">{name}</div>
            <div className="elements font-thin">{deadline}</div>
            <div className="elements font-thin">{internship_name}</div>
            {userRole === "TUTOR" && <div className="elements">{student_name}</div>}
            <div className="elements space-x-1">
              <ValidationBubble validationStatus="validated" firstname="Stephane" lastname="Plaza" />
              <ValidationBubble validationStatus="notValidated" firstname="Didier" lastname="Bourdon" />
              <ValidationBubble validationStatus="notTreated" firstname="Didier" lastname="Bourdon" />
            </div>
            <div className="elements">
              <Status status={status} />
            </div>
          </div>
          {userRole === "STUDENT" && (
            <>
              <ActionButton status={status} />
            </>
          )}
        </div>
      )}
    </>
  );
}

import PropTypes from "prop-types";

DocElement.propTypes = {
  name: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  student_name: PropTypes.string,
  internship_name: PropTypes.string,
  validation_name: PropTypes.string,
  status: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default DocElement;
