import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";

export default function Navbar() {
  const { handleLogOut } = useContext(FormContext);
  return (
    <nav className="navbar">
      <Link to="/edit">
        <span className="logo">leaflist</span>
      </Link>
      <button className="logout-btn" onClick={(e) => handleLogOut(e)}>
        Log Out
      </button>
    </nav>
  );
}
