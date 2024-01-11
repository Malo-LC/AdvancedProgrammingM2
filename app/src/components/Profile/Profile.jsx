//style
import "./profile.css";
import PropTypes from "prop-types";

export function Profile({ profilePicture, firstname, lastname }) {
  return (
    <div className="profile">
      <button className="notification-button">
        <img src="" />
      </button>
      <div className="flex flex-row">
        {firstname}
        {lastname}
      </div>
      <button>
        <img src={profilePicture} />
      </button>
    </div>
  );
}

Profile.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};
