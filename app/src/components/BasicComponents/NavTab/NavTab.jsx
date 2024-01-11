//style
import "./navtab.css";
import PropTypes from "prop-types";

export function NavTab({ name }) {
  return (
    <div className="button">
      <p className="button-text">{name}</p>
    </div>
  );
}

NavTab.propTypes = {
  name: PropTypes.string.isRequired,
};
