import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "../App";

export default function LinksList({ linksData }) {
  const { handleLinksListChange } = useContext(FormContext);

  function handleDeleteLink(e) {
    const linkToDelete = e.target.closest("#linkEl").dataset.id;
    const updatedLinks = linksData.filter((link) => link.id !== linkToDelete);
    console.log(updatedLinks);

    handleLinksListChange(updatedLinks);
  }

  let links;

  if (!linksData) {
    links = [];
  } else {
    links = linksData.map((link) => {
      return (
        <li
          id="linkEl"
          className="edit-form__link"
          key={link.id}
          data-id={link.id}
        >
          <Link className="link" to="/links">
            <div className="edit-form__link-text">{link.linkText}</div>
          </Link>
          {/* <div>{link.linkURL}</div> */}
          <button
            className="edit-form__link-delete"
            onClick={(e) => handleDeleteLink(e)}
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div className="edit-form__section edit-form__section-links">
      <label className="edit-form__label">Links</label>
      <ul>{links}</ul>
      <Link to="/links">
        <button className=" edit-form__section-links__add-btn">+</button>
      </Link>
    </div>
  );
}
