import React, { useContext, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Register() {
  const { errMsg, clearErrors, handleRegisterFormSubmit } =
    useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    console.log(`onsubmit data`, data);
    handleRegisterFormSubmit(data);
  }

  function onError(errors, e) {
    e.preventDefault();
    console.log(`onerror data`, errors);
  }

  // Clear error messages when unmounting
  useLayoutEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  return (
    <div className="register-container">
      <form
        className="form register-form"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <h1 className="register-form__header">Sign Up</h1>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="email"></label>
          <input
            className="register-form__input"
            type="email"
            name="username"
            id="username"
            placeholder="Email"
            autoFocus
            autoComplete="off"
            {...register("username", {
              required: {
                value: true,
              },
              pattern: {
                value: /.+@.+\..+/,
                message: "! Please enter a valid email",
              },
            })}
          />
          {errors.username && (
            <span className="form__validation-error">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="password"></label>
          <input
            className="register-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "! Password must be a minimum of 6 characters",
              },
            })}
          />
          {/* {errors.password ? (
            <div className="form-error">{errors.password.message}</div>
          ) : null} */}
          {errors.password && (
            <span className="form__validation-error">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="btn-flex">
          <button className="btn register-form__submit-btn" type="Submit">
            Sign Up
          </button>
          {errMsg.registerErr && (
            <Link to="/login" className="register-form__login-btn">
              <div className="btn">Login</div>
            </Link>
          )}
        </div>
      </form>
      {errMsg.registerErr && (
        <div className="form__error register-form__rror">
          <FontAwesomeIcon
            className="form__error__icon"
            icon={["fa", "circle-exclamation"]}
          />{" "}
          {errMsg.registerErr}
        </div>
      )}
      <p className="register-form__login-alt">
        Already have an account? Log in
        <Link to="/login" className="login-alt__link">
          {" "}
          here
        </Link>
      </p>
    </div>
  );
}
