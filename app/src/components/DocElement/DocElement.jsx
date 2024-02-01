import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ActionButton from "../BasicComponents/ActionButton/ActionButton";
import Status from "../BasicComponents/Status/Status";
import ValidationBubble from "../BasicComponents/ValidationBubble/ValidationBubble";

//style
import fileText from "../../assets/images/icons/file-text.svg";
import "./docelement.css";

function DocElement({ internShip, student_name, userRole, onOpenViewer }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileElementHeight = userRole === "STUDENT" ? 130 : 90;
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    if (internShip.submitId != null) {
      api.get(`submit/download/${internShip.submitId}`).then((res) => {
        setPdf(res);
      });
    }
  }, [internShip.submitId]);

  const handleClick = async () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickDoc = () => {
    onOpenViewer(pdf);
  };

  return (
    <>
      {isMobile ? (
        <motion.div className="docelement-mobile">
          <button onClick={handleClick} className="flex flex-row justify-between w-full items-center">
            <div className="elements text-xl">{internShip.reportName}</div>
            <div className="elements">
              <Status status={internShip.isSubmitted} type="document" />
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
                  <p className="font-thin">{internShip.deadline}</p>
                </div>
                {userRole === "STUDENT" && (
                  <div className="elements-hidden">
                    <p className="mr-2">Nom du stage :</p>
                    <p className="font-thin">{internShip.internship_name}</p>
                  </div>
                )}
                <div className="elements-hidden space-x-1 mt-1">
                  <p className="mr-2">Validations :</p>
                  <div className="flex flex-row space-x-2">
                    <ValidationBubble
                      validationStatus={internShip.tutorSchool.isValidated}
                      firstname={internShip.tutorSchool.firstName.toUpperCase()}
                      lastname={internShip.tutorSchool.lastName.toUpperCase()}
                    />
                    <ValidationBubble
                      validationStatus={internShip.tutorInternship.isValidated}
                      firstname={internShip.tutorInternship.firstName.toUpperCase()}
                      lastname={internShip.tutorInternship.lastName.toUpperCase()}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center mt-2 space-x-3">
                  {internShip.isSubmitted && (
                    <button onClick={handleClickDoc} className="px-2 bg-[#163767] rounded-lg">
                      <img src={fileText} />
                    </button>
                  )}
                  {userRole === "STUDENT" && (
                    <>
                      <ActionButton status={internShip.isSubmitted} file={pdf} />
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-row items-center space-x-2 px-2">
          <div className={`docelement justify-between w-full `}>
            <div className="flex flex-row items-center space-x-2">
              <p>{internShip.reportName}</p>
              {internShip.isSubmitted && (
                <button onClick={handleClickDoc} className="p-1 bg-[#163767] rounded-lg">
                  <img src={fileText} />
                </button>
              )}
            </div>
            <div className="elements font-thin">{internShip.deadline}</div>
            <div className="elements font-thin">{internShip.internship_name}</div>
            {userRole === "TUTOR" && <div className="elements">{internShip.userId.lastName}</div>}
            <div className="elements space-x-1">
              <ValidationBubble
                validationStatus={internShip.tutorSchool.isValidated}
                firstname={internShip.tutorSchool.firstName.toUpperCase()}
                lastname={internShip.tutorSchool.lastName.toUpperCase()}
              />
              <ValidationBubble
                validationStatus={internShip.tutorInternship.isValidated}
                firstname={internShip.tutorInternship.firstName.toUpperCase()}
                lastname={internShip.tutorInternship.lastName.toUpperCase()}
              />
            </div>
            <div className="elements">
              <Status status={internShip.isSubmitted} type="document" />
            </div>
          </div>
          {userRole === "STUDENT" && (
            <>
              <ActionButton status={internShip.isSubmitted} internShip={internShip} file={pdf} />
            </>
          )}
        </div>
      )}
    </>
  );
}

import PropTypes from "prop-types";
import api from "../../utils/api";

DocElement.propTypes = {
  student_name: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  internShip: PropTypes.object.isRequired,
  onOpenViewer: PropTypes.func.isRequired,
};

export default DocElement;
