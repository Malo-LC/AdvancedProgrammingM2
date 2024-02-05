import PropTypes from "prop-types";
import Status from "../BasicComponents/Status/Status";
import "./internshipelement.css";

function InternshipElement({ internShip }) {
  return (
    <div className="flex flex-row items-center space-x-2 px-2">
      <div className={`docelement justify-between w-full `}>
        <div className="elements">{internShip.mission}</div>
        <div className="elements ">{internShip.startDate}</div>
        <div className="elements">{internShip.endDate}</div>
        <div className="flex flex-row items-center space-x-2">
          <p>{internShip.companyName}</p>
        </div>
        <div className="elements">TODO</div>
        <div className="elements">
          <Status status={internShip.isInternshipValidated} type="document" />
        </div>
      </div>
    </div>
  );
}

InternshipElement.propTypes = {
  internShip: PropTypes.object.isRequired,
};

export default InternshipElement;
