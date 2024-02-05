import PropTypes from "prop-types";
import { Notification } from "../BasicComponents/Notification/Notification";
import { useEffect, useState } from "react";
import { ProfileTooltip } from "./ProfileTooltip/ProfileTooltip";
import api from "../../utils/api";

//style
import "./profilenav.css";

export function ProfileNav({ profilePicture, firstname, lastname, isMobile, userRole }) {
  const [requestNotifications, setRequestNotifications] = useState([]);
  const [docs, setDocs] = useState([]);

  const numberOfDocToSend = docs.filter((item) => {
    return item.tutorSchool.isValidated === false || item.tutorInternship.isValidated === false || item.isSubmitted === false;
  }).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      if (userRole === "TUTOR" || userRole === "ADMIN") {
        const res1 = await api.get("submit/to-validate");
        setRequestNotifications(res1 || []);
      } else {
        const response = await api.get("submit/all");
        setDocs(response || []);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  return (
    <div className="profile">
      {isMobile ? (
        <>
          <Notification notificationNumber={userRole === "TUTOR" || userRole === "ADMIN" ? requestNotifications.length : numberOfDocToSend} />
          <ProfileTooltip profilePicture={profilePicture} userRole={userRole} />
        </>
      ) : (
        <>
          <Notification
            notificationNumber={userRole === "TUTOR" || userRole === "ADMIN" ? requestNotifications.length : numberOfDocToSend}
            userRole={userRole}
          />
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
  userRole: PropTypes.string.isRequired,
};
