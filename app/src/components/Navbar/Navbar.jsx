import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import logo_efrei_white from "../../assets/images/logo_efrei_white.png";
import { NavTab } from "../BasicComponents/NavTab/NavTab.jsx";
import { ProfileNav } from "../ProfileNav/ProfileNav";

import { menuItemsAdmin, menuItemsStudent, menuItemsTuteur } from "../../constants/menuItems";
import userService from "../../services/userService.js";

//style
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const controls = useAnimation();
  let menuItems = [];

  const user = userService.getUserInfo();
  const userRole = userService.getRole();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    controls.start({ y: 0 });
  }, []);

  if (userRole === "STUDENT") {
    menuItems = menuItemsStudent;
  } else if (userRole === "ADMIN") {
    menuItems = menuItemsAdmin;
  } else if (userRole === "TUTOR") {
    menuItems = menuItemsTuteur;
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setShowNavbar(open);
  };

  return (
    <motion.div className="navbar" initial={{ y: "-100%" }} animate={controls} transition={{ type: "spring", bounce: 0.5 }}>
      {isMobile ? (
        <>
          <button type="button">
            <MenuIcon fontSize="large" sx={{ color: "rgba(255, 255, 255, 255)" }} onClick={toggleDrawer(true)} />
          </button>
          <Drawer anchor="left" open={showNavbar} onClose={toggleDrawer(false)}>
            <Box sx={{ width: "100%", maxWidth: 350, bgcolor: "background.paper" }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <nav>
                <List disablePadding>
                  {menuItems.map((item) => (
                    <ListItem key={item.label}>
                      <ListItemButton onClick={() => navigate(item.url)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>
          </Drawer>
          <div onClick={() => navigate("/home")}>
            <img src={logo_efrei_white} className="h-[30px]" alt="logo" />
          </div>
          {user && (
            <div className="profile">
              <ProfileNav
                isMobile={isMobile}
                firstname={user.firstname}
                lastname={user.lastname}
                profilePicture={user.profilePictureUri}
                userRole={userRole}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-row space-x-6 items-center">
            <div>
              <img alt="logo" src={logo_efrei_white} className="h-[40px] cursor-pointer" onClick={() => navigate("/home")} />
            </div>
          </div>
          <div className="flex flex-row space-x-3">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <NavTab name={item.label} url={item.url} />
                {index < menuItems.length - 1 && <div className="tab-separator">|</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="flex-none">
            {user && (
              <div className="profile">
                <ProfileNav
                  profilePicture={user.profilePictureUri}
                  isMobile={isMobile}
                  firstname={user?.firstname}
                  lastname={user?.lastname}
                  userRole={userRole}
                />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
