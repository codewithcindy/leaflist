import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <h1 className="header">Your link-in-bio sidekick</h1>
      <div className="landing-btns">
        <Link to="/login">
          <button className="btn landing-btns__login">Log In</button>
        </Link>
        <Link to="register">
          <button
            className="btn landing-btns__register
          "
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
