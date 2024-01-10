import PropTypes from "prop-types";

//styles
import "./input.css";

export function Input({ type, placeholder, iconLeft, iconRight, errors, register }) {
  function togglePasswordVisibility(e) {
    const input = e.target.parentElement.previousElementSibling;
    const type = input.type === "password" ? "text" : "password";

    input.type = type;
  }

  return (
    <div className="relative">
      <img src={iconLeft} alt={iconLeft} className="input-icon-left" />
      <input placeholder={placeholder} type={type} className="input" />
      {errors?.[type] && <span>{type} is required</span>}
      <button type="button" onClick={(e) => togglePasswordVisibility(e)}>
        <img src={iconRight === undefined ? "" : iconRight} alt={iconRight} className="input-icon-right" {...register(type, { required: true })} />
      </button>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  iconLeft: PropTypes.string.isRequired,
  iconRight: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
};
