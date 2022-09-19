import React from "react";
// import { FormContext } from "../App";

export default function NewLink(props) {
  const { linkInfo, handleLinkChange } = props;

  function handleChange(changes) {
    handleLinkChange(linkInfo.id, { ...linkInfo, ...changes });
  }

  return (
    <div className="links-form__section">
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
          value={linkInfo.linkText ?? ""}
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
          value={linkInfo.linkURL ?? ""}
          onChange={(e) => handleChange({ linkURL: e.target.value })}
        />
      </div>
    </div>
  );
}
