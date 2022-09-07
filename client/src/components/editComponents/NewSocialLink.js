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

  function handleChange(changes) {
    handleLinkInputChange(linkInfo.id, { ...linkInfo, ...changes });
  }

  // function handleIconSelect(iconName) {
  //   console.log(iconName);
  //   handleLinkInputChange();
  // }

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
          value={iconURL}
          onChange={(e) => handleChange({ socialLinkURL: e.target.value })}
          onClick={() => handleLinkSelect(linkInfo.id)}
        />
        <div className="social-links__icons-container">
          <FontAwesomeIcon
            icon={["fab", "twitter"]}
            className="social-links__icon"
            data-name="Twitter"
            // data-icon-type="brand"
            onClick={(e) =>
              handleChange({
                socialLinkIconName: e.target.dataset["name"], // socialLinkIconType: e.target.dataset.iconType,
              })
            }
          />

          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            className="social-links__icon"
            data-name="instagram"
            // data-icon-type="brand"
            onClick={(e) =>
              handleChange({
                socialLinkIconName: e.target.dataset["name"],
                // socialLinkIconType: e.target.dataset.iconType,
              })
            }
          />

          <FontAwesomeIcon
            icon={["fab", "youtube"]}
            className="social-links__icon"
            data-name="youtube"
            // data-icon-type="brand"
            onClick={(e) =>
              handleChange({
                socialLinkIconName: e.target.dataset["name"], // socialLinkIconType: e.target.dataset.iconType,
              })
            }
          />

          <FontAwesomeIcon
            icon={["fab", "tiktok"]}
            className="social-links__icon"
            data-name="Tiktok"
            // data-icon-type="brand"
            onClick={(e) =>
              handleChange({
                socialLinkIconName: e.target.dataset["name"], // socialLinkIconType: e.target.dataset.iconType,
              })
            }
          />
          <FontAwesomeIcon
            icon={["far", "envelope"]}
            className="social-links__icon"
            data-name="Envelope"
            // data-icon-type="regular"
            onClick={(e) =>
              handleChange({
                socialLinkIconName: e.target.dataset["name"], // socialLinkIconType: e.target.dataset.iconType,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
