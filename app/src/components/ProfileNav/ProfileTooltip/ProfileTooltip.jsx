import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect } from "react";
import api from "../../../utils/api";
import NoAvatar from "../../../assets/images/no-avatar.png";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Power, User } from "react-feather";

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
    if (!profilePicture) return;
    const res = await api.getPfp(profilePicture);
    setImage(res);
  };

  useEffect(() => {
    getPfp();
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
            borderRadius: 4,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")} style={{ height: "25px" }}>
          <User className="feather feather-user mr-2 h-5" color="#163767" />
          <p className="text-[#163767]">Profile</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => api.disconnect()} style={{ height: "25px" }}>
          <Power className="feather feather-power mr-2 h-5" color="#163767" />
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
