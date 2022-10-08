import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";

export default function NewSocialLink(props) {
  const { linkInfo, linkURL, handleLinkInputChange, handleLinkSelect } = props;

  const [active, setActive] = useState(false);
  const [icon, setIcon] = useState("");

  function handleURLChange(e) {
    const urlChange = { socialLinkURL: e.target.value };

    handleLinkInputChange(linkInfo.id, {
      ...linkInfo,
      ...urlChange,
    });
  }

  function handleIconChange(e) {
    // Updated socialLinkIcon
    const iconChange = { socialLinkIcon: e.currentTarget.dataset["name"] };
    const iconElementsArr = document.querySelectorAll(".social-links__icon");

    // Need value of the icon element
    let iconEl = e.currentTarget;

    iconElementsArr.forEach((el) => {
      // Add "active" class to selected icon
      if (el === iconEl) el.classList.add("active");

      // Remove "active" class from all other icons
      if (el !== iconEl) el.classList.remove("active");
    });

    // Update state of icon
    setIcon(iconChange.socialLinkIcon);
    handleLinkInputChange(linkInfo.id, { ...linkInfo, ...iconChange });

    // Icon element
    const iconElement = e.currentTarget;
  }

  return (
    <div className="form social-links-form__section">
      <label className="social-links-form__label" htmlFor="socialLinkURL">
        URL
      </label>
      <div className="social-links-form__input-row">
        <input
          className="social-links-form__input"
          type="text"
          name="socialLinkURL"
          id="socialLinkURL"
          autoComplete="off"
          value={linkURL}
          onChange={(e) => handleURLChange(e)}
          onClick={() => handleLinkSelect(linkInfo.id)}
        />
        <div className="social-links__icons-container">
          <div>
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="social-links__icon"
              data-name="instagram"
              onClick={(e) => handleIconChange(e)}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="social-links__icon"
              data-name="youtube"
              onClick={(e) => handleIconChange(e)}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "tiktok"]}
              className="social-links__icon"
              data-name="tiktok"
              onClick={(e) => handleIconChange(e)}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["far", "envelope"]}
              className="social-links__icon"
              data-name="email"
              onClick={(e) => handleIconChange(e)}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="social-links__icon "
              data-name="twitter"
              onClick={(e) => handleIconChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
