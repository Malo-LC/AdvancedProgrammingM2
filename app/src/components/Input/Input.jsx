import { useState } from "react";
import PropTypes from "prop-types";
import EyeOff from "../../assets/images/icons/EyeOff.png";
import NoAvatar from "../../assets/images/no-avatar.png";

//styles
import "./input.css";
import { Plus } from "react-feather";

export function Input({ type, name, placeholder, iconLeft, errors, register }) {
  const [inputType, setInputType] = useState(type);
  const [picture, setPicture] = useState(null);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  if (type === "file")
    return (
      <div className="flex flex-col items-center">
        <label htmlFor="file" className="block relative cursor-pointer">
          <img src={picture ? picture : NoAvatar} alt="avatar" className="w-16 h-16 rounded-full overflow-hidden" />
          <input
            id="file"
            className="hidden"
            type="file"
            accept="image/*"
            name={name}
            {...register(name)}
            onChange={(e) => setPicture(URL.createObjectURL(e.target.files[0]))}
          />
          <Plus className="absolute bottom-0 right-0 z-30 bg-white rounded-full overflow-hidden" />
        </label>
        {errors?.[name] && <span className="error-message">{errors[name].message}</span>}
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={iconLeft} alt={iconLeft} className="input-icon-left" />
        <input placeholder={placeholder} type={inputType} className="input" name={name} {...register(name)} />
        {type === "password" && (
          <button type="button" onClick={togglePasswordVisibility}>
            <img src={EyeOff} alt="see password" className="input-icon-right" />
          </button>
        )}
      </div>
      {errors?.[name] && <span className="error-message">{errors[name].message}</span>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  iconLeft: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
  picture: PropTypes.string,
};
