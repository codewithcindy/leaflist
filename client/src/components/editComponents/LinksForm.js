import React, { useState, useContext } from "react";
import { FormContext } from "../App";
import NewLink from "./NewLink";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function LinksForm() {
  const { userData, handleLinksSubmit } = useContext(FormContext);
  const navigate = useNavigate();

  const [links, setLinks] = useState(userData.links);

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

    console.log(e);

    handleLinksSubmit(links);

    // Redirect back to main edit page
    navigate("/edit");
  }

  return (
    <div>
      <h1>Links</h1>
      <form onSubmit={(e) => handleLinkFormSubmit(e)}>
        {links.map((linkInfo) => {
          return (
            <NewLink
              key={linkInfo.id ?? uuidv4()}
              linkInfo={linkInfo}
              handleLinkChange={handleLinkChange}
            />
          );
        })}
        <button onClick={(e) => handleLinkAdd(e)}>Add Link</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
