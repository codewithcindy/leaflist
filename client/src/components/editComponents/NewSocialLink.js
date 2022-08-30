import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fab, fas, faInstagram, faTwitter, faYoutube, faTiktok, faEnvelope);

export default function NewSocialLink(props) {
  const { selectedIcon, linkInfo, handleSocialLinkChange, handleSelect } =
    props;
  console.log(selectedIcon);

  function handleChange(changes) {
    handleSocialLinkChange(linkInfo.id, { ...linkInfo.id, ...changes });
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
        <FontAwesomeIcon prefix="fas" iconName={selectedIcon} />
      </div>
    </div>
  );
}
