import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

//assets
import logo_efrei from "../../assets/images/logo_efrei.png";

function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
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
  };

  return (
    <div className="h-screen">
      <div className="login-page">
        <div className="login-component">
          <img src={logo_efrei} alt="efrei_logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Email" className="input" type="email" {...register("email", { required: true })} />
              {errors?.email && <span>Email is required</span>}
            </div>
            <div>
              <input placeholder="Password" className="input" type="password" {...register("password", { required: true })} />
              {errors?.password && <span>Password is required</span>}
            </div>
            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
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
