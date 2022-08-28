import React from "react";
import { Link } from "react-router-dom";

export default function SocialLinksList(props) {
  const { socialLinksData } = props;

  return (
    <div className="edit-form__section edit-form__section-social-links">
      <label className="edit-form__label">Social Links</label>
      <ul>
        {socialLinksData.map((link) => {
          return (
            <Link to="/links">
              <li key={link.id}>{link.socialLinkURL}</li>
            </Link>
          );
        })}
      </ul>
      <Link to="/socialLinks">
        <button className="edit-form__section-social-links__add-btn">+</button>
      </Link>
    </div>
  );
}
