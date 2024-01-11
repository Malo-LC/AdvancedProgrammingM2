import PropTypes from "prop-types";
import { Notification } from "../BasicComponents/Notification/Notification";

import { ProfileTooltip } from "./ProfileTooltip/ProfileTooltip";

//style
import "./profilenav.css";

export function ProfileNav({ profilePicture, firstname, lastname, isMobile }) {
  return (
    <div className="profile">
      {isMobile ? (
        <>
          <ProfileTooltip firstname={firstname} lastname={lastname} profilePicture={profilePicture} />
        </>
      ) : (
        <>
          <Notification notificationNumber={4} />
          <div className="flex flex-row space-x-1">
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>
          <ProfileTooltip />
        </>
      )}
    </div>
  );
}

ProfileNav.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};
