import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect } from "react";
import power from "../../../assets/images/icons/power.svg";
import settings from "../../../assets/images/icons/settings.svg";
import user from "../../../assets/images/icons/user.svg";
import NoAvatar from "../../../assets/images/no-avatar.png";
import api from "../../../utils/api";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

export function ProfileTooltip({ profilePicture }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPfp = async () => {
    const res = await api.getPfp(profilePicture);
    setImage(res);
  };

  useEffect(() => {
    getPfp();
    api
      .get("user/me")
      .then((res) => {
        if (!res?.access_token) {
          api.disconnect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(profilePicture);
  }, []);

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
            <img src={image ? image : NoAvatar} alt="pfp" className="w-9 h-9 rounded-full" />
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
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <img src={user} className="h-6 mr-3 text-[#163767]" alt="User Icon" />
          <p className="text-[#163767]">Profile</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/settings")}>
          <img src={settings} className="h-6 mr-3 text-[#163767]" alt="Settings Icon" />
          <p className="text-[#163767]">Paramètres</p>
        </MenuItem>
        <MenuItem onClick={api.disconnect}>
          <img src={power} className="h-6 mr-3 text-[#163767]" alt="Power Icon" />
          <p className="text-[#163767]">Déconnexion</p>
        </MenuItem>
      </Menu>
    </div>
  );
}

ProfileTooltip.propTypes = {
  firstname: PropTypes.string,
  profilePicture: PropTypes.string,
};
