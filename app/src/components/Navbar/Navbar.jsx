import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
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

import userService from "../../services/userService.js";
import api from "../../utils/api.js";

//style
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const controls = useAnimation();

  const [user, setUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    controls.start({ y: 0 });
    const token = localStorage.getItem("token");

    console.log(token);

    const fetchUserInfo = async () => {
      if (token) {
        api.setToken(token);
        try {
          const userInfo = await userService.getUserInfo();
          console.log(userInfo);
          if (userInfo) {
            setUser(userInfo);
          }
        } catch (error) {
          console.log("Error fetching user info: ", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

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
                  <ListItem>
                    <ListItemButton onClick={() => navigate("/home")}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={() => navigate("/dashboard")}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={() => navigate("/documents")}>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText primary="Documents" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Drawer>
          <div>
            <img src={logo_efrei_white} className="h-[30px]" />
          </div>
          {user && (
            <div className="profile">
              <ProfileNav isMobile={isMobile} firstname={user.firstname} lastname={user.lastname} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex-none">
            <img src={logo_efrei_white} className="h-[40px]" />
          </div>
          <div className="flex-grow">
            <nav className="nav-element-container">
              <NavTab name="Home" />
              <NavTab name="Dashboard" />
              <NavTab name="Documents" />
            </nav>
          </div>
          <div className="flex-none">
            {user && (
              <div className="profile">
                <ProfileNav isMobile={isMobile} firstname={user?.firstname} lastname={user?.lastname} />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
