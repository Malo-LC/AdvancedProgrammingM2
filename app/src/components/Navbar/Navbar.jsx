import logo_efrei_white from "../../assets/images/logo_efrei_white.png";
import { NavTab } from "../BasicComponents/NavTab/NavTab.jsx";
import { ProfileNav } from "../ProfileNav/ProfileNav";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";

//style
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showNavbar, setShowNavbar] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setShowNavbar(open);
  };

  return (
    <div className="navbar">
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
          <div className="profile">
            <ProfileNav isMobile={isMobile} firstname="James" lastname="Jacob" />
          </div>
        </>
      ) : (
        <>
          <div>
            <img src={logo_efrei_white} className="h-[40px]" />
          </div>
          <div className="test">
            <nav className="nav-element-container">
              <NavTab name="Home" />
              <NavTab name="Documents" />
            </nav>
          </div>
          <div className="profile">
            <ProfileNav isMobile={isMobile} firstname="James" lastname="Jacob" />
          </div>
        </>
      )}
    </div>
  );
}
