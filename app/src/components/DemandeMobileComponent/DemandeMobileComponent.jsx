import { useState } from "react";
import { motion } from "framer-motion";


function DemandeMobileComponent(props /* columns, data, userRole, mobileElement*/) {

  const userRole = props.userRole;
  if (userRole === null) {
    console.log("DemandeMobileComponent: userRole is null");
    return (<></>);
  }

  const mobileIndex = props.mobileIndex;
  console.log("DemandeMobileComponent: mobileIndex = ", mobileIndex);

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
              <div className="elements text-xl">{val[mobileIndex.internship_name]}</div>
              <div className="elements">
                {val[mobileIndex.internship_status]}
              </div>
            </button>
            <motion.div className="expanded-content" animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? mobileElementHeight : 0 }}>
              {isExpanded && (
                <>
                  {props.userRole === "TUTOR" && (
                    <div className="elements-hidden">
                      <p className="mr-2">Etudiant : </p>
                      <p className="font-thin">{val[mobileIndex.student_name]}</p>
                    </div>
                  )}
                  <div className="elements-hidden">
                    <p className="mr-2">Société :</p>
                    <p className="font-thin">{val[mobileIndex.company_name]}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de début :</p>
                    <p className="font-thin">{val[mobileIndex.start_date]}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">Date de fin :</p>
                    <p className="font-thin">{val[mobileIndex.end_date]}</p>
                  </div>
                  <div className="elements-hidden">
                    <p className="mr-2">{val[mobileIndex.link]}</p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )
      })}
    </>
  )
}

export default DemandeMobileComponent;