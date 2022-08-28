import React from "react";
// import { FormContext } from "../App";

export default function NewLink(props) {
  const { linkInfo, handleLinkChange } = props;

  function handleChange(changes) {
    handleLinkChange(linkInfo.id, { ...linkInfo, ...changes });
  }

  return (
    <div>
      <div>
        <label htmlFor="linkText">Link Text</label>
        <input
          type="text"
          name="linkText"
          id="linkText"
          value={linkInfo.linkText ?? ""}
          onChange={(e) => handleChange({ linkText: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="linkURL">URL</label>
        <input
          type="text"
          name="linkURL"
          id="linkURL"
          value={linkInfo.linkURL ?? ""}
          onChange={(e) => handleChange({ linkURL: e.target.value })}
        />
      </div>
    </div>
  );
}
