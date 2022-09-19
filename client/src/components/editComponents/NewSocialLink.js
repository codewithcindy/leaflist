import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function NewSocialLink(props) {
  const { linkInfo, linkURL, handleLinkInputChange, handleLinkSelect } = props;

  const [active, setActive] = useState(false);

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

    handleLinkInputChange(linkInfo.id, { ...linkInfo, ...iconChange });

    // Clicked icon
    // const icon = e.currentTarget.dataset["name"];

    // Icon element
    const iconElement = e.currentTarget;

    // if (iconElement.dataset["name"] ===) console.log(icon);

    // setActive(icon);
  }

  return (
    <div className="social-links-form__section">
      <label className="social-links-form__label" htmlFor="socialLinkURL">
        URL
      </label>
      <div
        className="social-links-form__input-row"
        // onClick={(e)}
      >
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
          <div
            // className={getClassName("Instagram  ")}
            data-name="Instagram"
            onClick={(e) => handleIconChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="social-links__icon"
              data-name="Instagram"
            />
          </div>
          <div
            className={active ? "active" : ""}
            data-name="Youtube"
            onClick={(e) => handleIconChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="social-links__icon"
              data-name="Youtube"
            />
          </div>
          <div
            className={active ? "active" : ""}
            data-name="Tiktok"
            onClick={(e) => handleIconChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "tiktok"]}
              className="social-links__icon"
              data-name="Tiktok"
            />
          </div>
          <div
            className={active ? "active" : ""}
            data-name="Envelope"
            onClick={(e) => handleIconChange(e)}
          >
            <FontAwesomeIcon
              icon={["far", "envelope"]}
              className="social-links__icon"
              data-name="Envelope"
            />
          </div>
          <div
            className={active ? "active" : ""}
            data-name="Twitter"
            onClick={(e) => handleIconChange(e)}
          >
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="social-links__icon"
              data-name="Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
