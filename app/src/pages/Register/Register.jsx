import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import logo_efrei from "../../assets/images/logo_efrei.png";
import { toast } from "react-toastify";
import { Calendar, Lock, Mail, Phone, User } from "react-feather";
import { useEffect, useState } from "react";
import { readFileAsync, registerSchema } from "../../utils/authDataService";

//styles
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const isTutorRegister = useLocation().pathname === "/tutor-register";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema(isTutorRegister)),
  });

  const onSubmit = async (data) => {
    const f = data.profilePicture[0];
    const rawBody = await readFileAsync(f);

    const finalData = {
      firstName: data.firstname?.trim(),
      lastName: data.lastname?.trim(),
      email: data.email?.trim(),
      password: data.password?.trim(),
      profilePicture: rawBody ? { base64: rawBody, name: f.name, type: f.type } : null,
      phoneNumber: data.phoneNumber,
      promotionId: data.promotionId,
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

  useEffect(() => {
    if (!isTutorRegister) {
      api.get("auth/promotions").then((res) => {
        setPromotions(res);
      });
    }
  }, []);

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
              <div className="flex flex-col">
                <div className="relative">
                  <div className="input-icon-left">
                    <Calendar />
                  </div>
                  <select {...register("promotionId")} defaultValue="" className="input">
                    <option disabled value="">
                      Select your promotion
                    </option>
                    {promotions.map((promotion) => (
                      <option key={promotion.id} value={promotion.id}>
                        {promotion.promotionClass}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
