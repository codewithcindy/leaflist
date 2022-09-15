import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./App";
import FormData from "form-data";

export default function Register() {
  const { errMsg, handleRegisterFormSubmit } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleChange(changes) {}

  async function handleFormSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    handleRegisterFormSubmit(formData);
  }

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={(e) => {
          handleSubmit(handleFormSubmit(e));
        }}
      >
        <h1 className="register-form__header">Welcome ✨</h1>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="email"></label>
          <input
            className="register-form__input"
            type="email"
            name="username"
            id="username"
            placeholder="Email"
            // value={email ? email : ""}
            // onChange={(e) => setEmail(e.target.value)}
            {...register("username", { required: true })}
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
            // value={password ? password : ""}
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password", { required: true })}
          ></input>
          {errors.email && <span>Password is required</span>}
        </div>
        <p>
          Already have an account? Log in <Link to="/login">here</Link>
        </p>
        <div>{errMsg.registerErr}</div>
        <div className="btn-flex">
          <button className="btn login-form__submit-btn" type="Submit">
            Sign Up
          </button>
          {errMsg.registerErr && (
            <Link to="/login">
              <button className="btn login-form__submit-btn">Login</button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
