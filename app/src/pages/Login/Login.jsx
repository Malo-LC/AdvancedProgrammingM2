import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//style
import "./login.css";

//assets
import logo_efrei from "../../assets/images/logo_efrei.png";
import mail from "../../assets/images/icons/mail.png";
import lock from "../../assets/images/icons/lock.png";
import EyeOff from "../../assets/images/icons/EyeOff.png";

function Login() {
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    mail: Yup.string().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    api
      .post("auth/authenticate", data)
      .then((res) => {
        api.setToken(res.access_token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div className="h-screen">
      <div className="login-page">
        <div className="login-component">
          <img src={logo_efrei} alt="efrei_logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Mail" type="text" name="mail" iconLeft={mail} errors={errors} register={register} />
            <Input placeholder="Password" type="password" name="password" iconLeft={lock} iconRight={EyeOff} errors={errors} register={register} />
            <div className="button-container">
              <input type="submit" value="Login"></input>
              <div className="no-account">
                <p>No account?</p>
                <Link to="/register" className="register-link ">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
