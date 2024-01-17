//style
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import "./navtab.css";

export function NavTab({ name, url }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <button className={`navtab ${isActive ? "active" : ""}`} onClick={() => navigate(url)}>
      <p className="button-text">{name}</p>
    </button>
  );
}

NavTab.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
