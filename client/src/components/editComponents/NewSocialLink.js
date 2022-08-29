import React from "react";

export default function NewSocialLink(props) {
  const { icon, linkInfo, handleSocialLinkChange, handleSelect } = props;

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
        <div>
          <i className={"fa-brands fa-" + icon}></i>
          {/* <img src={`"${linkInfo.socialLinkIcon}"`} alt="social link icon" /
          > */}
          {/* <p className="social-links-form__icon">
            {linkInfo.socialLinkIcon ?? "default icon"}
          </p> */}
        </div>
      </div>
    </div>
  );
}
