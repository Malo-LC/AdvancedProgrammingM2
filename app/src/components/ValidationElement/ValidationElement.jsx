import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../utils/api";

//style
import fileText from "../../assets/images/icons/file-text.svg";
import "./validationelement.css";

function ValidationElement({ document, onOpenViewer, onAccept, onDecline }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [pdf, setPdf] = useState(null);
  const mobileElementHeight = 90;

  useEffect(() => {
    if (document.submitId != null) {
      api.get(`submit/download/${document.submitId}`).then((res) => {
        setPdf(res);
      });
    }
  }, [document.submitId]);

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
            <div className="elements text-xl">{document.reportName}</div>
          </button>
          <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
            {isExpanded && (
              <>
                <div className="elements-hidden">
                  <p className="mr-2">Nom :</p>
                  <p className="font-thin">{document.userId.lastName}</p>
                </div>

                <div className="elements-hidden">
                  <p className="mr-2">Prénom :</p>
                  <p className="font-thin">{document.userId.firstName}</p>
                </div>
                <div className="w-full flex justify-center mt-2 space-x-3">
                  {document.isSubmitted && (
                    <button onClick={handleClickDoc} className="px-2 py-2 bg-[#163767] rounded-lg">
                      <img src={fileText} />
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex docelement flex-row items-center w-full justify-between px-[150px]">
          <div className=" flex flex-col">
            <div className="flex flex-row space-x-1">
              <p className="font-bold">{document.userId.lastName}</p>
              <p className="font-bold">{document.userId.firstName}</p>
            </div>
            <p className="font-extralight">Stage de {document.year}</p>
          </div>
          <p className="font-extralight text-[#163767] underline underline-offset-4">{document.reportName}</p>
          <div className="flex flex-row space-x-2">
            <button onClick={() => onAccept(document.submitId)} className="accept-button">
              Accepter
            </button>
            <button onClick={() => onDecline(document.submitId)} className="decline-button">
              Refuser
            </button>
          </div>
        </div>
      )}
    </>
  );
}

ValidationElement.propTypes = {
  document: PropTypes.object.isRequired,
  onOpenViewer: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default ValidationElement;
