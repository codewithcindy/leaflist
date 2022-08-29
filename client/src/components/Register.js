import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleRegisterFormSubmit(data) {
    // Navigate to EditForm and pass in the data to userData
    navigate("/edit");
  }

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit(handleRegisterFormSubmit)}
      >
        <h1 className="register-form__header">Welcome ✨</h1>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="email"></label>
          <input
            className="register-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          ></input>
          {errors.email && <span>Email is required</span>}
        </div>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="password"></label>
          <input
            className="register-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
          ></input>
          {errors.email && <span>Password is required</span>}
        </div>
        <button className="btn login-form__submit-btn" type="Submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
