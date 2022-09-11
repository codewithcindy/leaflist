import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./App";
import FormData from "form-data";

export default function Register() {
  const { handleRegisterFormSubmit } = useContext(FormContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleChange(changes) {}

  async function handleFormSubmit(e) {
    e.preventDefault();

    // const formData = new URLSearchParams();
    // formData.append("username", e.target.username.value);
    // formData.append("password", e.target.password.value);

    // console.log(e.target.email.value);

    // const formData = new FormData();
    // formData.append("username", e.target.username.value);
    // formData.append("password", e.target.password.value);

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    // const newRegisterData = {
    //   username: e.target.email.value,
    //   password: e.target.password.value,
    // };

    // console.log(formData);

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
        <button className="btn login-form__submit-btn" type="Submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
