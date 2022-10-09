import React, { useState, useContext } from "react";
import NewSocialLink from "./NewSocialLink";
import { FormContext } from "../App";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function SocialLinksForm() {
  const { userData, handleSocialLinksSubmit } = useContext(FormContext);
  const navigate = useNavigate();

  let existingSocialLinks;
  if (!userData.socialLinks) {
    existingSocialLinks = [];
  } else {
    existingSocialLinks = userData.socialLinks;
  }

  const [socialLinks, setSocialLinks] = useState(existingSocialLinks);
  const [linkSelectedId, setLinkSelectedId] = useState("");
  const [linkIconSelected, setLinkIconSelected] = useState("");

  // Handle link select
  function handleLinkSelect(id) {
    setLinkSelectedId(id);
  }

  // Handle link input change
  function handleLinkInputChange(id, changes) {
    // console.log(changes);
    // updating links...
    let newLinks = [...socialLinks];

    newLinks = newLinks.map((link) => {
      if (link.id === id) {
        return changes;
      }
      return link;
    });

    setSocialLinks(newLinks);
  }

  // Handle new link add
  function handleSocialLinkAdd(e) {
    e.preventDefault();

    const newSocialLink = {
      id: uuidv4(),
      socialLinkIcon: "",
      socialLinkURL: "",
    };

    const newSocialLinks = [...socialLinks, newSocialLink];
    setSocialLinks(newSocialLinks);
  }

  // handle form submit
  function handleFormSubmit(e) {
    e.preventDefault();

    console.log(socialLinks);

    // Only keep the links with the URL field completed
    const completedLinks = socialLinks.filter((link) => {
      if (link.socialLinkIcon && link.socialLinkURL) return link;
    });

    console.log(completedLinks);

    handleSocialLinksSubmit(completedLinks);
    navigate("/edit");
  }

  function updateLinksForm(updatedLinks) {
    console.log(`updatedlinks in sociallinksfomr`, updatedLinks);
    setSocialLinks(updatedLinks);
  }

  return (
    <div className="social-links-container">
      <form
        className="form social-links__form"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h1 className="social-links__header">social links</h1>
        {socialLinks.map((link) => {
          return (
            <NewSocialLink
              key={link.id}
              linkInfo={link}
              linkIcon={link.socialLinkIcon}
              linkURL={link.socialLinkURL}
              handleLinkInputChange={handleLinkInputChange}
              handleLinkSelect={handleLinkSelect}
              updateLinksForm={updateLinksForm}
              linkSelectedId={linkSelectedId}
            />
          );
        })}
        <div className="btn-flex">
          <button
            className="btn btn-add-link"
            onClick={(e) => handleSocialLinkAdd(e)}
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
