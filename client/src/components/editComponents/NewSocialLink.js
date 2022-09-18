import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function NewSocialLink(props) {
  const {
    linkInfo,
    iconName,
    iconURL,
    handleLinkInputChange,
    handleLinkSelect,
  } = props;

  const [isSelect, setIsSelect] = useState("");

  function handleChange(e) {
    const iconChange = { socialLinkIcon: e.currentTarget.parentNode };
    const textChange = { socialLinkURL: e.target.value };

    handleLinkInputChange(linkInfo.id, {
      ...linkInfo,
      ...iconChange,
      ...textChange,
    });
  }

  return (
    <div className="social-links-form__section">
      <label className="social-links-form__label" htmlFor="socialLinkURL">
        URL
      </label>
      <div
        className="social-links-form__input-row"
        onClick={(e) => console.log("link id is" + linkInfo.id)}
      >
        <input
          className="social-links-form__input"
          type="text"
          name="socialLinkURL"
          id="socialLinkURL"
          autoComplete="off"
          value={iconURL}
          onChange={(e) => handleChange(e)}
          onClick={() => handleLinkSelect(linkInfo.id)}
        />
        <div className="social-links__icons-container">
          <div
            className="social-links__icon"
            data-name="Twitter"
            onClick={(e) => handleChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="fontAwesomeIcon"
              data-name="Twitter"
            />
          </div>
          <div
            className="social-links__icon"
            data-name="Instagram"
            onClick={(e) => handleChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="social-links__icon"
              data-name="Instagram"
            />
          </div>
          <div
            className="social-links__icon"
            data-name="Youtube"
            onClick={(e) => handleChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="social-links__icon"
              data-name="Youtube"
            />
          </div>
          <div
            className="social-links__icon"
            data-name="Tiktok"
            onClick={(e) => handleChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "tiktok"]}
              className="social-links__icon"
              data-name="Tiktok"
            />
          </div>
          <div
            className="social-links__icon"
            data-name="Envelope"
            onClick={(e) => handleChange(e)}
          >
            <FontAwesomeIcon
              icon={["far", "envelope"]}
              className="social-links__icon"
              data-name="Envelope"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
