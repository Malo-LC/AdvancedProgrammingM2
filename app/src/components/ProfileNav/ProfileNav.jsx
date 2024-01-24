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
          <Notification notificationNumber={4} />
          <ProfileTooltip profilePicture={profilePicture} />
        </>
      ) : (
        <>
          <Notification notificationNumber={4} />
          <div className="flex flex-row space-x-1">
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>
          <ProfileTooltip profilePicture={profilePicture} />
        </>
      )}
    </div>
  );
}

ProfileNav.propTypes = {
  profilePicture: PropTypes.string,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};
