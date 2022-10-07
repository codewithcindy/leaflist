import React, { useContext } from "react";
import { FormContext } from "./App";

export default function Navbar() {
  const { handleLogOut } = useContext(FormContext);
  return (
    <nav className="navbar">
      <span className="logo">leaflist</span>
      <button className="logout-btn" onClick={(e) => handleLogOut(e)}>
        Log Out
      </button>
    </nav>
  );
}
