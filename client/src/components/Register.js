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

  function handleChange(changes) {
    // console.log(changes.email);
    // const email = { ...formEmail, ...changes };
    // const password = { ...formPassword, ...changes };
    // setFormEmail(...email);
    // setFormPassword(...password);
    // const
    // const currentFormData = { ...formData };
    // const newFormData = { ...currentFormData, ...changes };
    // setFormData(newFormData);
  }

  // function handleFormSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);

  //   formData.append("email", email);
  //   formData.append("password", password);

  //   // for (let [key, value] of formData.entries()) {
  //   //   formData.append(key, value);
  //   // }

  //   console.log("form data");
  //   console.log(formData);

  //   let formObject = Object.fromEntries(formData.entries());

  //   handleRegisterFormSubmit(formObject);

  //   // Navigate to EditForm
  //   // navigate("/edit");
  // }

  function handleFormSubmit(e) {
    e.preventDefault();

    // console.log(e.target.email.value);

    const newRegisterData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(newRegisterData);

    handleRegisterFormSubmit(newRegisterData);
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
            name="email"
            id="email"
            placeholder="Email"
            // value={email ? email : ""}
            // onChange={(e) => setEmail(e.target.value)}
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
