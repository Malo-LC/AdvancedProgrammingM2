import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import Status from "../BasicComponents/Status/Status";

import { useState } from "react";
import "./demandestageelement.css";

function DemandeStageElement({ internShip, userRole }) {
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
            <div className="elements text-xl">{internShip.companyName}</div>
            <div className="elements">
              <Status status={internShip.isInternshipValidated} type="document" />
            </div>
          </button>
          <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
            {isExpanded && (
              <>
                <div className="elements-hidden">
                  <p className="mr-2">Mission :</p>
                  <p className="font-thin">{internShip.mission}</p>
                </div>

                <div className="elements-hidden">
                  <p className="mr-2">Date de début :</p>
                  <p className="font-thin">{internShip.startDate}</p>
                </div>

                <div className="elements-hidden">
                  <p className="mr-2">Nom du stage :</p>
                  <p className="font-thin">{internShip.endDate}</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-row items-center space-x-2 px-2">
          <div className={`docelement justify-between w-full `}>
            <div className="elements">
              <Status status={internShip.isInternshipValidated} type="document" />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p>{internShip.companyName}</p>
            </div>
            <div className="elements">{internShip.mission}</div>
            <div className="elements ">{internShip.startDate}</div>
            <div className="elements">{internShip.endDate}</div>
          </div>
        </div>
      )}
    </>
  );
}

DemandeStageElement.propTypes = {
  userRole: PropTypes.string.isRequired,
  internShip: PropTypes.object.isRequired,
};

export default DemandeStageElement;
