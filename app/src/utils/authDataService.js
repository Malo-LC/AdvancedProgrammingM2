import * as Yup from "yup";

export function readFileAsync(file) {
  if (!file) {
    return null;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const registerSchema = (isTutorRegister) => {
  return Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    profilePicture: Yup.mixed().required(),
    phoneNumber: !isTutorRegister ? Yup.string().min(4).max(19).required() : Yup.string().notRequired(),
    promotionId: !isTutorRegister ? Yup.number().required().nonNullable() : Yup.number().notRequired(),
    email: Yup.string().email("Invalid email format").required(),
    password: Yup.string().required().min(4, "Password length should be at least 4 characters"),
    cpassword: Yup.string()
      .required()
      .min(4, "Password length should be at least 4 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
