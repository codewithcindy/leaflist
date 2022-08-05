import React from "react";

export default function LogIn() {
  return (
    <div className="login">
      <h1 className="header">Welcome Back ✨</h1>
      <form className="login-form">
        <div className="login-form__row">
          <label className="login-form__label" htmlFor="email"></label>
          <input
            className="login-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
        </div>
        <div className="login-form__row">
          <label htmlFor="password" className="login-form__label"></label>
          <input
            className="login-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          ></input>
        </div>
        <button className="btn login-form__submit-btn" type="Submit">
          Log In
        </button>
      </form>
    </div>
  );
}
