import logo_efrei_white from "../../assets/images/logo_efrei_white.png";
import { NavTab } from "../BasicComponents/NavTab/NavTab.jsx";
import { Profile } from "../Profile/Profile";

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
        <Profile firstname="James" lastname="Jacob" />
      </div>
    </div>
  );
}
