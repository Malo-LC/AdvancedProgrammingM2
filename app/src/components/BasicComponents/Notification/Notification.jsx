import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import React from "react";

//style
import "./notification.css";

export function Notification({ notificationNumber, userRole }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge
              badgeContent={notificationNumber}
              color="warning"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <NotificationsNoneIcon style={{ color: "white", fontSize: 25 }} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: 4,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="notification-tooltip">
          <p className="notification-header">Vos notifications :</p>
          {notificationNumber > 0 && (userRole === "TUTOR" || userRole === "ADMIN") && (
            <p className="notification-precision">
              {notificationNumber === 1 ? "Vous avez 1 nouvelle demande de validation" : `Vous avez ${notificationNumber} demandes de validation`}
            </p>
          )}
          {notificationNumber > 0 && userRole === "STUDENT" && (
            <p className="notification-precision">
              {notificationNumber === 1 ? "Vous avez 1 nouveau document à envoyer" : `Vous avez ${notificationNumber} nouveaux documents à envoyer`}
            </p>
          )}
          {notificationNumber === 0 && <p className="notification-precision">Vous n&apos;avez aucune notification</p>}
        </div>
      </Menu>
    </div>
  );
}

Notification.propTypes = {
  notificationNumber: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired,
};
