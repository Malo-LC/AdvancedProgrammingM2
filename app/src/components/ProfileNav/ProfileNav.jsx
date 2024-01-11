//style
import "./profilenav.css";
import PropTypes from "prop-types";
import { Notification } from "../BasicComponents/Notification/Notification";
import { Avatar } from "@mui/material";

export function ProfileNav({ profilePicture, firstname, lastname }) {
  return (
    <div className="profile">
      <Notification notificationNumber={4} />
      <div className="flex flex-row space-x-1">
        <p>{firstname}</p>
        <p>{lastname}</p>
      </div>
      <button>
        <Avatar alt={firstname} src={profilePicture} sx={{ width: 35, height: 35 }} />
      </button>
    </div>
  );
}

ProfileNav.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};
