import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//styles
import "./tutorRegister.css";

//assets
import logo_efrei from "../../assets/images/logo_efrei.png";
import mail from "../../assets/images/icons/mail.png";
import lock from "../../assets/images/icons/lock.png";
import profile from "../../assets/images/icons/profile.png";
import EyeOff from "../../assets/images/icons/EyeOff.png";

function TutorRegister() {
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
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
    const rawBody = await readFileAsync(f);

    const finalData = {
      firstName: data.firstname?.trim(),
      lastName: data.lastname?.trim(),
      email: data.email?.trim(),
      password: data.password?.trim(),
      profilePicture: { base64: rawBody, name: f.name, type: f.type },
    };

    api
      .post("auth/register/tutor", finalData)
      .then((res) => {
        console.log(res);
        if (!res.access_token) {
          return;
        }
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
            <Input placeholder="Firstname" type="text" name="firstname" iconLeft={profile} errors={errors} register={register} />
            <Input placeholder="Lastname" type="text" name="lastname" iconLeft={profile} errors={errors} register={register} />
            <Input placeholder="Mail" type="text" name="email" iconLeft={mail} errors={errors} register={register} />
            <Input placeholder="Profile picture" type="file" name="profilePicture" iconLeft={mail} errors={errors} register={register} />
            <Input placeholder="Password" type="password" name="password" iconLeft={lock} iconRight={EyeOff} errors={errors} register={register} />
            <Input
              placeholder="Password Confirmation"
              type="password"
              name="cpassword"
              iconLeft={lock}
              iconRight={EyeOff}
              errors={errors}
              register={register}
            />
            <div className="button-container">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TutorRegister;
