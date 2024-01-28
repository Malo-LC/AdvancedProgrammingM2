import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//styles
import "./register.css";

//assets
import logo_efrei from "../../assets/images/logo_efrei.png";
import { toast } from "react-toastify";
import { Calendar, Lock, Mail, Phone, User } from "react-feather";

function Register() {
  const navigate = useNavigate();
  const isTutorRegister = useLocation().pathname === "/tutor-register";

  const formSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    profilePicture: Yup.mixed().required(),
    phoneNumber: !isTutorRegister ? Yup.string().min(4).max(19).required() : Yup.string().notRequired(),
    promotionYear: !isTutorRegister ? Yup.number().min(2000).max(2100).required() : Yup.number().notRequired(),
    email: Yup.string().email("Invalid email format").required(),
    password: Yup.string().required().min(4, "Password length should be at least 4 characters"),
    cpassword: Yup.string()
      .required()
      .min(4, "Password length should be at least 4 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onSubmit = async (data) => {
    const f = data.profilePicture[0];
    if (!f) return toast.error("Please select a profile picture");
    const rawBody = await readFileAsync(f);

    const finalData = {
      firstName: data.firstname?.trim(),
      lastName: data.lastname?.trim(),
      email: data.email?.trim(),
      password: data.password?.trim(),
      profilePicture: { base64: rawBody, name: f.name, type: f.type },
      phoneNumber: data.phoneNumber,
      promotionYear: data.promotionYear,
    };

    api
      .post(isTutorRegister ? "auth/register/tutor" : "auth/register", finalData)
      .then((res) => {
        if (!res.access_token) {
          return toast.error("An error occured, please try with another email");
        }
        if (isTutorRegister) {
          toast.success("Tutor registered successfully");
          reset();
          return;
        }
        api.setToken(res.access_token);
        navigate("/home");
      })
      .catch(() => {
        toast.error("An error occured, please try with another email");
      });
  };

  return (
    <div className={isTutorRegister ? "h-[calc(100vh-50px)]" : "h-screen"}>
      <div className={`register-page ${isTutorRegister ? "register-page-tutor" : null}`}>
        <div className="register-component">
          <img src={logo_efrei} alt="efrei_logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Input placeholder="Profile picture" type="file" name="profilePicture" errors={errors} register={register} />
            <Input placeholder="First name" type="text" name="firstname" IconLeft={<User />} errors={errors} register={register} />
            <Input placeholder="Last name" type="text" name="lastname" IconLeft={<User />} errors={errors} register={register} />
            <Input placeholder="Mail" type="text" name="email" IconLeft={<Mail />} errors={errors} register={register} />
            {!isTutorRegister && (
              <Input placeholder="Phone" type="text" name="phoneNumber" IconLeft={<Phone />} errors={errors} register={register} />
            )}
            {!isTutorRegister && (
              <Input placeholder="Promotion year" type="number" name="promotionYear" IconLeft={<Calendar />} errors={errors} register={register} />
            )}
            <Input placeholder="Password" type="password" name="password" IconLeft={<Lock />} errors={errors} register={register} />
            <Input placeholder="Password Confirmation" type="password" name="cpassword" IconLeft={<Lock />} errors={errors} register={register} />
            <div className="button-container">
              <input type="submit" value="Register" />
              {!isTutorRegister && (
                <div className="no-account">
                  <p>Already an account?</p>
                  <Link to="/" className="register-link">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
