import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

//style
import "./notification.css";

export function Notification({ notificationNumber }) {
  return (
    <button>
      <Badge
        badgeContent={notificationNumber}
        color="warning"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <NotificationsNoneIcon />
      </Badge>
    </button>
  );
}

Notification.propTypes = {
  notificationNumber: PropTypes.number.isRequired,
};
