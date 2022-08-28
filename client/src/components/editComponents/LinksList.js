import React from "react";
import { Link } from "react-router-dom";

export default function LinksList(props) {
  const { linksData } = props;
  // const linksArray = linksData.map((data) => console.log(data));

  return (
    <div className="edit-form__section edit-form__section-links">
      <label className="edit-form__label">Links</label>
      <ul>
        {linksData.map((link) => {
          return (
            <Link to="/links">
              <li key={link.id}>{link.linkText}</li>
            </Link>
          );
        })}
      </ul>
      <Link to="/links">
        <button className=" edit-form__section-links__add-btn">+</button>
      </Link>
    </div>
  );
}
