import { useState } from "react";
import PropTypes from "prop-types";

//styles
import "./input.css";

export function Input({ type, name, placeholder, iconLeft, iconRight, errors, register }) {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={iconLeft} alt={iconLeft} className="input-icon-left" />
        <input placeholder={placeholder} type={inputType} className="input" name={name} {...register(name)} />
        <button type="button" onClick={togglePasswordVisibility}>
          <img src={iconRight === undefined ? "" : iconRight} alt={iconRight} className="input-icon-right" />
        </button>
      </div>
      {errors && errors[name] && <span className="error-message">{errors[name].message}</span>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  iconLeft: PropTypes.string.isRequired,
  iconRight: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
};
