import PropTypes from "prop-types";
import { Notification } from "../BasicComponents/Notification/Notification";
import { useEffect, useState } from "react";
import { ProfileTooltip } from "./ProfileTooltip/ProfileTooltip";
import api from "../../utils/api";

//style
import "./profilenav.css";

export function ProfileNav({ profilePicture, firstname, lastname, isMobile }) {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("submit/all");
      setNotifications(response || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

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
