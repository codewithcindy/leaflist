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

    // New link object
    const newLink = {
      id: uuidv4(),
      linkText: "",
      linkURL: "",
    };

    // New links array with current links plus the new link
    const newLinks = [...links, newLink];
    setLinks(newLinks);
  }

  function handleLinkFormSubmit(e) {
    e.preventDefault();

    // Return links with completed fields
    function isFormCompleted(link) {
      if (link.linkURL.length > 0) return link;
    }

    // Filtered array with links with completed fields
    const completedLinks = links.filter(isFormCompleted);

    // Submit Link Form
    handleLinksSubmit(completedLinks);

    // Redirect back to main edit page
    navigate("/edit");
  }

  function updateLinksForm(updatedLinks) {
    setLinks(updatedLinks);
  }

  return (
    <div className="links-form-container">
      <form
        className="form links-form"
        onSubmit={(e) => handleLinkFormSubmit(e)}
      >
        <h1 className="links-form__header">links</h1>
        {links.map((link) => {
          return (
            <NewLink
              key={link.id ?? uuidv4()}
              link={link}
              handleLinkChange={handleLinkChange}
              updateLinksForm={updateLinksForm}
            />
          );
        })}
        <div className="btn-flex">
          <button
            className="btn btn-add-link"
            onClick={(e) => handleLinkAdd(e)}
          >
            +
          </button>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
