import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import logo_efrei_white from "../../assets/images/logo_efrei_white.png";
import { NavTab } from "../BasicComponents/NavTab/NavTab.jsx";
import { ProfileNav } from "../ProfileNav/ProfileNav";

// import BusinessIcon from "@mui/icons-material/Business";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import userService from "../../services/userService.js";
import api from "../../utils/api.js";
import { menuItemsStudent, menuItemsAdmin, menuItemsTuteur } from "../../constants/menuItems";

//style
import "./navbar.css";

//will be exported later probleme using MUI icon in JS file
// const menuItemsStudent = [
//   { label: "Faire ma demande", url: "/demandes", icon: <SupervisorAccountIcon /> },
//   { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
//   { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
// ];

// const menuItemsAdmin = [
//   { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
//   { label: "Creation compte tuteur", url: "/demandes", icon: <SupervisorAccountIcon /> },
//   { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
// ];
// const menuItemsTuteur = [
//   { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
//   { label: "Creation compte tuteur", url: "/demandes", icon: <SupervisorAccountIcon /> },
//   { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
// ];

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const controls = useAnimation();
  let menuItems = [];

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    controls.start({ y: 0 });
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          const userInfo = await userService.getUserInfo();
          const userRole = await userService.getRole();
          if (userInfo) {
            console.log(userInfo);
            setUser(userInfo);
          }
          if (userRole) {
            setUserRole(userRole);
          }
        } catch (error) {
          console.log("Error fetching user info: ", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  if (userRole === "STUDENT") {
    menuItems = menuItemsStudent;
  } else if (userRole === "ADMIN") {
    menuItems = menuItemsAdmin;
  } else if (userRole === "TUTEUR") {
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
          <button>
            <MenuIcon fontSize="large" sx={{ color: "rgba(255, 255, 255, 255)" }} onClick={toggleDrawer(true)} />
          </button>
          <Drawer anchor="left" open={showNavbar} onClose={toggleDrawer(false)}>
            <Box sx={{ width: "100%", maxWidth: 350, bgcolor: "background.paper" }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <nav>
                <List disablePadding>
                  {menuItems.map((item, index) => (
                    <ListItem key={index}>
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
            <img src={logo_efrei_white} className="h-[30px]" />
          </div>
          {user && (
            <div className="profile">
              <ProfileNav isMobile={isMobile} firstname={user.firstname} lastname={user.lastname} profilePicture={user.profilePictureUri} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-row space-x-6 items-center">
            <div>
              <img src={logo_efrei_white} className="h-[40px] cursor-pointer" onClick={() => navigate("/home")} />
            </div>
            <div className="flex flex-row space-x-3">
              {menuItems.map((item, index) => (
                <div key={index} className="flex">
                  <NavTab name={item.label} url={item.url} />
                  {index < menuItemsStudent.length - 1 && <div className="tab-separator">|</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-none">
            {user && (
              <div className="profile">
                <ProfileNav profilePicture={user.profilePictureUri} isMobile={isMobile} firstname={user?.firstname} lastname={user?.lastname} />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
