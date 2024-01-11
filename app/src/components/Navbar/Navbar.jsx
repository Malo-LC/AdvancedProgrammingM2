import logo_efrei_white from "../../assets/images/logo_efrei_white.png";
import { NavTab } from "../BasicComponents/NavTab/NavTab.jsx";
import { ProfileNav } from "../ProfileNav/ProfileNav";

//style
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <img src={logo_efrei_white} className="logo-navbar" />
      <div className="nav-element-container">
        <NavTab name="Home" />
        <NavTab name="Documents" />
      </div>
      <div className="profile">
        <ProfileNav firstname="James" lastname="Jacob" />
      </div>
    </div>
  );
}
