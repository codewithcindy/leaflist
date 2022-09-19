import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "./App";
import { useNavigate, Link } from "react-router-dom";
import FormData from "form-data";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errMsg, handleLoginFormSubmit } = useContext(FormContext);

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    handleLoginFormSubmit(formData);
  }

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={(e) => handleSubmit(handleFormSubmit(e))}
      >
        <h1 className="login-form__header">welcome back</h1>
        <div className="login-form__row">
          <label className="login-form__label" htmlFor="email"></label>
          <input
            className="login-form__input"
            type="email"
            name="username"
            id="username"
            placeholder="Email"
            autoComplete="off"
            {...register("username", { required: true })}
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
            autoComplete="off"
            {...register("password", { required: true, minLength: 6 })}
          ></input>
          {errors.password && <span>Password is required</span>}
        </div>
        <p className="register-btn">
          Not registered? Sign up <Link to="/register">here</Link>
        </p>
        <div>{errMsg.loginErr}</div>

        <div className="btn-flex">
          {errMsg.loginErr && (
            <Link to="/register">
              <button className="btn login-form__submit-btn">Sign Up</button>
            </Link>
          )}
          <button className="btn login-form__submit-btn" type="Submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
