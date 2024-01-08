import React from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

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
    <form className="flex flex-col mt-40 gap-4 items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input className="border border-gray-300" type="email" {...register("email", { required: true })} />
        {errors?.email && <span>Email is required</span>}
      </div>
      <div>
        <label>Firstname</label>
        <input className="border border-gray-300" type="text" {...register("firstName", { required: true })} />
        {errors?.firstName && <span>FirstName is required</span>}
      </div>
      <div>
        <label>Lastname</label>
        <input className="border border-gray-300" type="text" {...register("lastName", { required: true })} />
        {errors?.lastName && <span>LastName is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input className="border border-gray-300" type="password" {...register("password", { required: true })} />
        {errors?.password && <span>Password is required</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
