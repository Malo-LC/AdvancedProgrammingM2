import Status from "../BasicComponents/Status/Status";
import ValidationBubble from "../BasicComponents/ValidationBubble/ValidationBubble";
import ActionButton from "../BasicComponents/ActionButton/ActionButton";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { motion } from "framer-motion";

//style
import "./stageelement.css";

function StageElement({ title, startInternship, endInternship, company, action, status }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileElementHeight =  130 ;

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isMobile ? (
        <motion.div className="stageelement-mobile">
          <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
            <div className="elements text-xl">{name}</div>
            <div className="elements">
              <Status status={status} />
            </div>
          </button>
          <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
            {isExpanded && (
                <>
                  <div className="elements-hidden">
                    <p className="mr-2">Intitulé stage :</p>
                    <p className="font-thin">{<title></title>}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de début :</p>
                    <p className="font-thin">{startInternship}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de début :</p>
                    <p className="font-thin">{startInternship}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de fin :</p>
                    <p className="font-thin">{endInternship}</p>
                  </div>
                  <div className="elements-hidden space-x-1 mt-1">
                    <p className="mr-2">Validations :</p>
                    <div className="flex flex-row space-x-2">
                      <ValidationBubble validationStatus="validated" firstname="Stephane" lastname="Plaza"/>
                      <ValidationBubble validationStatus="notValidated" firstname="Didier" lastname="Bourdon"/>
                      <ValidationBubble validationStatus="notTreated" firstname="Didier" lastname="Bourdon"/>
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-2">
                    {(
                        <>
                          <ActionButton status={status}/>
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
              <div className="elements font-thin">{startInternship}</div>
              <div className="elements font-thin">{endInternship}</div>
              <div className="elements space-x-1">
                <ValidationBubble validationStatus="validated" firstname="Stephane" lastname="Plaza"/>
                <ValidationBubble validationStatus="notValidated" firstname="Didier" lastname="Bourdon"/>
                <ValidationBubble validationStatus="notTreated" firstname="Didier" lastname="Bourdon"/>
              </div>
              <div className="elements">
                <Status status={status}/>
              </div>
            </div>
        </div>
      )}
    </>
  );
}

import PropTypes from "prop-types";

StageElement.propTypes = {
  title: PropTypes.string.isRequired,
  startInternship: PropTypes.string.isRequired,
  endInternship: PropTypes.string.isRequired,
  company: PropTypes.string,
  action: PropTypes.string,
  status: PropTypes.string.isRequired
};
export default StageElement;
