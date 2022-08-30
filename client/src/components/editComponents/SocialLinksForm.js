import React, { useState, useContext } from "react";
import NewSocialLink from "./NewSocialLink";
import { FormContext } from "../App";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function SocialLinksForm() {
  const { userData, handleSocialLinksSubmit } = useContext(FormContext);
  const navigate = useNavigate();

  const [socialLinks, setSocialLinks] = useState(userData.socialLinks);
  const [socialLinkSelectedId, setSocialLinkSelectedId] = useState("");
  const [socialLinkIconSelected, setSocialLinkIconSelected] = useState("");

  let dynamicIcon = { selectedIcon: socialLinkIconSelected };

  function handleSocialLinkSelect(id) {
    // console.log(id);
    setSocialLinkSelectedId(id);
  }

  function handleSocialIconSelect(icon) {
    setSocialLinkIconSelected(icon);
    handleSocialLinkUpdate(icon);
  }

  function handleSocialLinkUpdate(icon) {
    // find social link
    let socialLinksCopy = [...socialLinks];

    const updatedSocialLinks = socialLinksCopy.map((obj) => {
      if (obj.id === socialLinkSelectedId) {
        return { ...obj, socialLinkIcon: icon };
      }
      return obj;
    });

    setSocialLinks(updatedSocialLinks);
  }

  function handleSocialLinkAdd(e) {
    e.preventDefault();

    const newSocialLink = {
      id: uuidv4(),
      socialLinkURL: "",
      socialLinkIcon: "",
    };

    const newSocialLinks = [...socialLinks, newSocialLink];
    setSocialLinks(newSocialLinks);
  }

  function handleSocialLinkChange(id, changes) {
    const newSocialLinks = [...socialLinks];
    const index = newSocialLinks.findIndex((link) => link.id === id);
    newSocialLinks[index] = changes;
    setSocialLinks(newSocialLinks);
  }

  function handleSocialLinksFormSubmit(e) {
    e.preventDefault();

    handleSocialLinksSubmit(socialLinks);

    navigate("/edit");
  }

  return (
    <div className="social-links-container">
      <form
        className="social-links__form"
        onSubmit={(e) => handleSocialLinksFormSubmit(e)}
      >
        <h1 className="social-links__title">Social Links</h1>
        <div className="social-links__icons-container">
          <div
            className="social-links__icon"
            data-icon-id="Twitter"
            onClick={(e) => handleSocialIconSelect(e.target.dataset.iconId)}
          >
            Twitter
          </div>
          <div
            className="social-links__icon"
            data-icon-id="Instagram"
            onClick={(e) => handleSocialIconSelect(e.target.dataset.iconId)}
          >
            Instagram
          </div>
          <div
            className="social-links__icon"
            data-icon-id="Youtube"
            onClick={(e) => handleSocialIconSelect(e.target.dataset.iconId)}
          >
            Youtube
          </div>
          <div
            className="social-links__icon"
            data-icon-id="Tiktok"
            onClick={(e) => handleSocialIconSelect(e.target.dataset.iconId)}
          >
            TikTok
          </div>
          <div
            className="social-links__icon"
            data-icon-id="Envelope"
            onClick={(e) => handleSocialIconSelect(e.target.dataset.iconId)}
          >
            Email
          </div>
        </div>
        {socialLinks.map((link) => {
          return (
            <NewSocialLink
              key={link.id}
              linkInfo={link}
              // linkIcon={link.socialLinkIcon}
              // linkURL={link.socialLinkURL}
              // selectedIcon={socialLinkIconSelected}
              {...dynamicIcon}
              handleSocialLinkChange={handleSocialLinkChange}
              handleSelect={handleSocialLinkSelect}
            />
          );
        })}
        <button className="btn" onClick={(e) => handleSocialLinkAdd(e)}>
          Add Social Link
        </button>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
