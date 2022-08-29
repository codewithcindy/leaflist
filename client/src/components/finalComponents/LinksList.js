import React from "react";
import { Link } from "react-router-dom";

export default function LinksList({ linksData }) {
  const links = linksData.map((link) => {
    return <li key={link.id}>{link.linkText}</li>;
  });

  return (
    <div className="edit-form__section edit-form__section-links">
      <label className="edit-form__label">Links</label>
      <ul>
        <Link to="/links">{links}</Link>
      </ul>
      <Link to="/links">
        <button className=" edit-form__section-links__add-btn">+</button>
      </Link>
    </div>
  );
}
