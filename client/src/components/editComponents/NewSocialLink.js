import React from "react";

export default function NewSocialLink(props) {
  const { linkInfo, handleSocialLinkChange, handleSelect } = props;

  function handleChange(changes) {
    handleSocialLinkChange(linkInfo.id, { ...linkInfo, ...changes });
  }

  return (
    <div>
      <label htmlFor="socialLinkURL">URL</label>
      <div>
        <input
          type="text"
          name="socialLinkURL"
          id="socialLinkURL"
          value={linkInfo.socialLinkURL}
          onChange={(e) => handleChange({ socialLinkURL: e.target.value })}
          onClick={() => handleSelect(linkInfo.id)}
        />
        <div>
          {/* <img src={`"${linkInfo.socialLinkIcon}"`} alt="social link icon" /
          > */}
          <p>{linkInfo.socialLinkIcon ?? "default icon"}</p>
        </div>
      </div>
    </div>
  );
}
