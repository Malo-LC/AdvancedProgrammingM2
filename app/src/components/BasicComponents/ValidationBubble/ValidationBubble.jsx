import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

//style
import "./validationbubble.css";

function ValidationBubble({ firstname, lastname, validationStatus }) {
  const firstInitial = firstname ? firstname.charAt(0) : "";
  const lastInitial = lastname ? lastname.charAt(0) : "";

  let bubbleStyle = "w-8 h-8 rounded-full flex flex-row justify-center items-center border-2 text-sm";

  switch (validationStatus) {
    case true:
      bubbleStyle += " bg-[#E4F8EE] border-[#5CBF92] text-[#5CBF92]";
      break;
    case false:
      bubbleStyle += " bg-[#FEE8E1] border-[#F1582A] text-[#F1582A]";
      break;
    case null:
      bubbleStyle += " bg-[#CCCCCC] border-[#8A8686] text-[#8A8686]";
      break;
    default:
      break;
  }

  return (
    <Tooltip title={firstname + " " + lastname} placement="top">
      <div className={`${bubbleStyle}`}>
        <p>{firstInitial}</p>
        <p>{lastInitial}</p>
      </div>
    </Tooltip>
  );
}

ValidationBubble.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  validationStatus: PropTypes.bool,
};

export default ValidationBubble;
