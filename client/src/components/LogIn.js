import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "./App";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errMsg, clearErrors, handleLoginFormSubmit } =
    useContext(FormContext);

  const navigate = useNavigate();

  function onSubmit(data, e) {
    e.preventDefault();

    handleLoginFormSubmit(data);
  }

  function onError(errors, e) {
    e.preventDefault();

    console.log(errors, e);
  }

  // Clear error messages upon mounting
  // useEffect(() => {
  //   clearErrors();
  // }, []);

  // Clear error messages when unmounting
  useLayoutEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  return (
    <div className="login-container">
      <form
        className="form login-form"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h1 className="login-form__header">Log In</h1>
        <div className="login-form__row">
          <label className="login-form__label" htmlFor="email"></label>
          <input
            className="login-form__input"
            type="email"
            name="username"
            id="username"
            placeholder="Email"
            autoFocus
            autoComplete="off"
            {...register("username", { required: true })}
          ></input>
          {errors.email && (
            <span>Please provide a valid email address and password.</span>
          )}
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
          {errors.password && (
            <span>Please provide a valid email address and password.</span>
          )}
        </div>
        <div className="btn-flex">
          {errMsg.loginErr && (
            <Link to="/register" className="login-form__register-btn">
              <div className="btn">Sign Up</div>
            </Link>
          )}
          <button className="btn login-form__submit-btn" type="Submit">
            Log In
          </button>
        </div>
        {errMsg.loginErr && (
          <div className="form-error login-form-error">
            <FontAwesomeIcon
              className="form-error__icon"
              icon={["fa", "circle-exclamation"]}
            />{" "}
            {errMsg.loginErr}
          </div>
        )}
        {/* <div className="form-error login-form-error">{errMsg.loginErr}</div> */}
        <p className="login-form__register-alt">
          Not registered? Sign up{" "}
          <Link to="/register" className="register-alt__link">
            {""}here
          </Link>
        </p>
      </form>
    </div>
  );
}
