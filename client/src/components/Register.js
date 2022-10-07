import React, { useRef, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./App";
import FormData from "form-data";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const { errMsg, handleRegisterFormSubmit } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    handleRegisterFormSubmit(formData);
  }

  return (
    <div className="register-container">
      <form
        className="form register-form"
        onSubmit={(e) => {
          handleSubmit(handleFormSubmit(e));
        }}
      >
        <h1 className="register-form__header">sign up</h1>
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
            // value={email ? email : ""}
            // onChange={(e) => setEmail(e.target.value)}
            {...register("username", {
              required: true,
            })}
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
            autoComplete="off"
            // value={password ? password : ""}
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          ></input>
          {errors.email && <span>Password is required</span>}
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
        <div className="form-error register-form-error">
          {errMsg.registerErr}
        </div>
        <p className="register-form__login-alt">
          Already have an account? Log in
          <Link to="/login" className="login-alt__link">
            {" "}
            here
          </Link>
        </p>
      </form>
    </div>
  );
}
