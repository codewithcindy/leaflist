import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  return (
    <div className="landing-container">
      <h1 className="header">leaflist</h1>
      <p className="sub-header">Your link-in-bio friend</p>
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
