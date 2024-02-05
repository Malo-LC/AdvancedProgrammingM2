import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import Status from "../BasicComponents/Status/Status";

import { useState } from "react";
import "./internshipelement.css";
//["Intitulé du stage", "Date du début", "Date de fin", "Société", "Action", "Status"];

function InternshipElement({ internShip, userRole }) {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isExpanded, setIsExpanded] = useState(false);
    const mobileElementHeight = userRole === "STUDENT" ? 130 : 90;

    const handleClick = async () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isMobile ? (
                <motion.div className="internshipelement-mobile">
                    <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
                        {isExpanded && (
                            <>
                                <div className="elements">{internShip.mission}</div>
                                <div className="elements ">{internShip.startDate}</div>
                                <div className="elements">{internShip.endDate}</div>
                                <div className="flex flex-row items-center space-x-2">
                                    <p>{internShip.companyName}</p>
                                </div>
                                <div className="elements">
                                    todo
                                </div>
                                <div className="elements">
                                    <Status status={internShip.isInternshipValidated} type="document"/>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            ) : (
                <div className="flex flex-row items-center space-x-2 px-2">
                    <div className={`docelement justify-between w-full `}>

                        <div className="elements">{internShip.mission}</div>
                        <div className="elements ">{internShip.startDate}</div>
                        <div className="elements">{internShip.endDate}</div>
                        <div className="flex flex-row items-center space-x-2">
                            <p>{internShip.companyName}</p>
                        </div>
                        <div className="elements">
                            todo
                        </div>
                        <div className="elements">
                            <Status status={internShip.isInternshipValidated} type="document"/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

InternshipElement.propTypes = {
    userRole: PropTypes.string.isRequired,
    internShip: PropTypes.object.isRequired,
};

export default InternshipElement;
