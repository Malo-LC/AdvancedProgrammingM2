import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";

//styles
import "./register.css";

//assets
import logo_efrei from "../../assets/images/logo_efrei.png";
import mail from "../../assets/images/icons/mail.png";
import lock from "../../assets/images/icons/lock.png";
import profile from "../../assets/images/icons/profile.png";
import EyeOff from "../../assets/images/icons/EyeOff.png";

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    api
      .post("auth/register", data)
      .then((res) => {
        api.setToken(res.access_token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen">
      <div className="register-page">
        <div className="register-component">
          <img src={logo_efrei} alt="efrei_logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Firstname" type="firstname" iconLeft={profile} errors={errors} register={register} />
            <Input placeholder="Lastname" type="Lastname" iconLeft={profile} errors={errors} register={register} />
            <Input placeholder="Mail" type="email" iconLeft={mail} errors={errors} register={register} />
            <Input placeholder="Password" type="password" iconLeft={lock} iconRight={EyeOff} errors={errors} register={register} />
            <Input placeholder="Password Confirmation" type="password" iconLeft={lock} iconRight={EyeOff} errors={errors} register={register} />
            <div className="button-container">
              <input type="submit" value="Login"></input>
              <div className="no-account">
                <p>Already an account?</p>
                <Link to="/" className="register-link">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
