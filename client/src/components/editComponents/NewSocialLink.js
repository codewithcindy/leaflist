import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
// import { regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export default function NewSocialLink(props) {
  const { icon, linkInfo, handleSocialLinkChange, handleSelect } = props;

  const [iconName, setIconName] = useState("fa" + icon);

  console.log(faTwitter);

  function handleChange(changes) {
    handleSocialLinkChange(linkInfo.id, { ...linkInfo, ...changes });
  }

  return (
    <div className="social-links-form__section">
      <label className="social-links-form__label" htmlFor="socialLinkURL">
        URL
      </label>
      <div className="social-links-form__input-row">
        <input
          className="social-links-form__input"
          type="text"
          name="socialLinkURL"
          id="socialLinkURL"
          value={linkInfo.socialLinkURL}
          onChange={(e) => handleChange({ socialLinkURL: e.target.value })}
          onClick={() => handleSelect(linkInfo.id)}
        />
        <FontAwesomeIcon icon={iconName} />
      </div>
    </div>
  );
}
