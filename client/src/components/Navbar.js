import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";

export default function Navbar() {
  const { isLoggedIn, handleLogOut } = useContext(FormContext);
  return (
    <nav className="navbar">
      <Link className="logo__link" to="/edit">
        <span className="logo__text">leaflist</span>
      </Link>
      {isLoggedIn && (
        <button className="logout-btn" onClick={(e) => handleLogOut(e)}>
          Log Out
        </button>
      )}
    </nav>
  );
}
