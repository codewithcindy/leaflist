import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../App";

// import { FormContext } from "../App";

export default function NewLink(props) {
  const { link, handleLinkChange, updateLinksForm } = props;
  const { userData, handleLinksListChange } = useContext(FormContext);

  const [links, setLinks] = useState(userData.links);

  function handleChange(changes) {
    handleLinkChange(link.id, { ...link, ...changes });
  }

  function handleDeleteLink(e) {
    e.preventDefault();

    const linkToDelete = e.target.closest("#linkDiv").dataset.id;

    // const linksData = userData.links;

    const updatedLinks = links.filter((link) => link.id !== linkToDelete);

    updateLinksForm(updatedLinks);

    handleLinksListChange(updatedLinks);
  }

  return (
    <div id="linkDiv" data-id={link.id} className="form links-form__section">
      <div className="links-form__row links-form__row-text">
        <label className="links-form__input-label" htmlFor="linkText">
          Link Text
        </label>
        <input
          className="links-form__input-value"
          type="text"
          name="linkText"
          id="linkText"
          autoComplete="off"
          value={link.linkText ?? ""}
          onChange={(e) => handleChange({ linkText: e.target.value })}
        />
      </div>
      <div className="links-form__row links-form__row-url">
        <label className="links-form__input-label" htmlFor="linkURL">
          URL
        </label>
        <input
          className="links-form__input-value"
          type="text"
          name="linkURL"
          id="linkURL"
          autoComplete="off"
          value={link.linkURL ?? ""}
          onChange={(e) => handleChange({ linkURL: e.target.value })}
        />
        <button
          className="links-form__row__delete-btn"
          onClick={(e) => handleDeleteLink(e)}
        >
          <FontAwesomeIcon
            className="links-form__row__delete-icon"
            icon={(["fa", "regular"], ["fa", "trash-can"])}
          />
        </button>
      </div>
    </div>
  );
}
