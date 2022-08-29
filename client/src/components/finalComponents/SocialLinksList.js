import React from "react";
import { Link } from "react-router-dom";

export default function SocialLinksList({ socialLinksData }) {
  const socialLinks = socialLinksData.map((link) => {
    return <li key={link.id}>{link.socialLinkIcon}</li>;
  });

  return (
    <div className="edit-form__section edit-form__section-social-links">
      <label className="edit-form__label">Social Links</label>
      <ul>
        <Link to="/links">{socialLinks}</Link>
      </ul>
      <Link to="/socialLinks">
        <button className="edit-form__section-social-links__add-btn">+</button>
      </Link>
    </div>
  );
}
