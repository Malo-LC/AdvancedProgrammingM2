import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import logo_efrei from "../../assets/images/logo_efrei.png";
import { Lock, Mail } from "react-feather";
import { loginSchema } from "../../utils/authDataService";
//style
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const finalData = {
      email: data.email?.trim(),
      password: data.password?.trim(),
    };
    api
      .post("auth/authenticate", finalData)
      .then((res) => {
        if (!res.access_token) {
          return toast.error("Invalid credentials !");
        }
        api.setToken(res.access_token);
        navigate("/home");
      })
      .catch(() => {
        toast.error("Invalid credentials !", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="h-screen">
      <div className="login-page">
        <div className="login-component">
          <img src={logo_efrei} alt="efrei_logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Mail" type="text" name="email" IconLeft={<Mail />} errors={errors} register={register} />
            <Input placeholder="Password" type="password" name="password" IconLeft={<Lock />} errors={errors} register={register} />
            <div className="button-container">
              <input type="submit" value="Login" />
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
