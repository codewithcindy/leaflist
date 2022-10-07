import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialLinksList({ socialLinksData }) {
  let socialLinks;

  if (!socialLinksData) {
    socialLinks = [];
  } else {
    socialLinks = socialLinksData.map((link) => {
      const icon = link.socialLinkIcon.toLowerCase();

      if (icon === "twitter") {
        return (
          <Link className="link" to="/socialLinks">
            <li className="edit-form__social-link" key={link.id}>
              <div className="edit-form__social-link__icon">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
              </div>
              <div className="edit-form__social-link__url">
                {link.socialLinkURL}
              </div>
            </li>
          </Link>
        );
      } else if (icon === "instagram") {
        return (
          <Link className="link" to="/socialLinks">
            <li className="edit-form__social-link" key={link.id}>
              <div className="edit-form__social-link__icon">
                <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
              </div>
              <div className="edit-form__social-link__url">
                {link.socialLinkURL}
              </div>
            </li>
          </Link>
        );
      } else if (icon === "youtube") {
        return (
          <Link className="link" to="/socialLinks">
            <li className="edit-form__social-link" key={link.id}>
              <div className="edit-form__social-link__icon">
                <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
              </div>
              <div className="edit-form__social-link__url">
                {link.socialLinkURL}
              </div>
            </li>
          </Link>
        );
      } else if (icon === "tiktok") {
        return (
          <Link className="link" to="/socialLinks">
            <li className="edit-form__social-link" key={link.id}>
              <div className="edit-form__social-link__icon">
                <FontAwesomeIcon icon={["fab", "tiktok"]} size="lg" />
              </div>
              <div className="edit-form__social-link__url">
                {link.socialLinkURL}
              </div>
            </li>
          </Link>
        );
      } else if (icon === "envelope") {
        return (
          <Link className="link" to="/socialLinks">
            <li className="edit-form__social-link" key={link.id}>
              <div className="edit-form__social-link__icon">
                <FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
              </div>
              <div className="edit-form__social-link__url">
                {link.socialLinkURL}
              </div>
            </li>
          </Link>
        );
      }
    });
  }

  return (
    <div className="edit-form__section edit-form__section-social-links">
      <label className="edit-form__label">Social Links</label>
      <ul>{socialLinks}</ul>
      <Link to="/socialLinks">
        <button className="edit-form__section-social-links__add-btn">+</button>
      </Link>
    </div>
  );
}
