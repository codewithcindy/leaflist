import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleLoginFormSubmit(data) {
    // Check user auth
    // Navigate to EditForm and pass in user data as userData in App

    navigate("/edit");
  }

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit(handleLoginFormSubmit)}
      >
        <h1 className="login-form__header">Welcome Back ✨</h1>
        <div className="login-form__row">
          <label className="login-form__label" htmlFor="email"></label>
          <input
            className="login-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          ></input>
          {errors.email && <span>Email is required</span>}
        </div>
        <div className="login-form__row">
          <label htmlFor="password" className="login-form__label"></label>
          <input
            className="login-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          ></input>
          {errors.password && <span>Password is required</span>}
        </div>
        <button className="btn login-form__submit-btn" type="Submit">
          Log In
        </button>
      </form>
    </div>
  );
}
