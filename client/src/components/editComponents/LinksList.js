import React from "react";
import { Link } from "react-router-dom";

export default function LinksList({ linksData }) {
  let links;

  if (!linksData) {
    links = [];
  } else {
    links = linksData.map((link) => {
      return (
        <li className="edit-form__link" key={link.id}>
          <div className="edit-form__link-text">{link.linkText}</div>
          {/* <div>{link.linkURL}</div> */}
        </li>
      );
    });
  }

  return (
    <div className="edit-form__section edit-form__section-links">
      <label className="edit-form__label">Links</label>
      <ul>
        <Link className="link" to="/links">
          {links}
        </Link>
      </ul>
      <Link to="/links">
        <button className=" edit-form__section-links__add-btn">+</button>
      </Link>
    </div>
  );
}
