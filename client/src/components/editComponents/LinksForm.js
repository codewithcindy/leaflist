import React, { useState, useContext } from "react";
import { FormContext } from "../App";
import NewLink from "./NewLink";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function LinksForm() {
  const navigate = useNavigate();
  const { userData, handleLinksSubmit } = useContext(FormContext);

  // Set links
  let existingLinks;
  if (!userData.links) {
    existingLinks = [];
  } else {
    existingLinks = userData.links;
  }

  const [links, setLinks] = useState(existingLinks);

  function handleLinkChange(id, updatedLink) {
    // updating links...
    const newLinks = [...links];
    const index = newLinks.findIndex((link) => link.id === id);
    newLinks[index] = updatedLink;
    setLinks(newLinks);
  }

  function handleLinkAdd(e) {
    e.preventDefault();

    const newLink = {
      id: uuidv4(),
      linkText: "",
      linkURL: "",
    };

    const newLinks = [...links, newLink];
    setLinks(newLinks);
  }

  function handleLinkFormSubmit(e) {
    e.preventDefault();

    // Return links with completed fields
    function isFormCompleted(link) {
      if (link.linkText.length > 0 && link.linkURL.length > 0) return link;
    }

    // Filtered array with links with completed fields
    const completedLinks = links.filter(isFormCompleted);

    // Submit Link Form
    handleLinksSubmit(completedLinks);

    // Redirect back to main edit page
    navigate("/edit");
  }

  return (
    <div className="links-form-container">
      <form className="links-form" onSubmit={(e) => handleLinkFormSubmit(e)}>
        <h1 className="links-form__header">links</h1>
        {links.map((linkInfo) => {
          return (
            <NewLink
              key={linkInfo.id ?? uuidv4()}
              linkInfo={linkInfo}
              handleLinkChange={handleLinkChange}
            />
          );
        })}
        <button className="btn" onClick={(e) => handleLinkAdd(e)}>
          Add Link
        </button>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
