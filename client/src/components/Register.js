import React from "react";

export default function Register() {
  return (
    <div className="register">
      <h1 className="header">Welcome ✨</h1>
      <form className="register-form">
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="email"></label>
          <input
            className="register-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
        </div>
        <div className="register-form__row">
          <label className="register-form__label" htmlFor="password"></label>
          <input
            className="register-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          ></input>
        </div>
        <button className="btn login-form__submit-btn" type="Submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
