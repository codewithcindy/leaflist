import React from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <h1 className="header">Your link-in-bio sidekick</h1>
      <div className="landing-btns-container">
        <NavLink to="/login" className="landing-btns__link">
          <button className="btn landing-btns__login">Log In</button>
        </NavLink>
        <NavLink to="register" className="landing-btns__link">
          <button
            className="btn landing-btns__register
          "
          >
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
}
