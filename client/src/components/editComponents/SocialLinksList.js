import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../App";

export default function SocialLinksList({ socialLinksData }) {
  const { handleSocialLinksListChange } = useContext(FormContext);

  let socialLinks;

  function handleDeleteLink(e) {
    const linkToDelete = e.target.closest("#linkEl").dataset.id;
    const updatedLinks = socialLinksData.filter(
      (link) => link.id !== linkToDelete
    );
    console.log(updatedLinks);

    handleSocialLinksListChange(updatedLinks);
  }
  if (!socialLinksData) {
    socialLinks = [];
  } else {
    socialLinks = socialLinksData.map((link) => {
      const icon = link.socialLinkIcon.toLowerCase();

      if (icon === "twitter") {
        return (
          <li
            className="edit-form__social-link"
            id="linkEl"
            data-id={link.id}
            key={link.id}
          >
            <div className="edit-form__social-link__icon">
              <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
            </div>
            <div className="edit-form__social-link__info">
              <Link className="link" to="/socialLinks">
                <div className="edit-form__social-link__url">
                  {link.socialLinkURL}
                </div>
              </Link>
              <div className="btn-flex btn-flex__social-link">
                <Link to="/socialLinks">
                  <button className="edit-form__link-edit">
                    <FontAwesomeIcon
                      className="edit-form__link-edit-icon"
                      icon={["fa", "pen-to-square"]}
                    />
                  </button>
                </Link>
                <button
                  className="edit-form__link-delete"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  <FontAwesomeIcon
                    className="edit-form__link-delete-icon"
                    icon={(["fa", "regular"], ["fa", "trash-can"])}
                  />
                </button>
              </div>
            </div>
          </li>
        );
      } else if (icon === "instagram") {
        return (
          <li
            className="edit-form__social-link"
            id="linkEl"
            data-id={link.id}
            key={link.id}
          >
            <div className="edit-form__social-link__icon">
              <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
            </div>
            <div className="edit-form__social-link__info">
              <Link className="link" to="/socialLinks">
                <div className="edit-form__social-link__url">
                  {link.socialLinkURL}
                </div>
              </Link>
              <div className="btn-flex btn-flex__social-link">
                <Link to="/socialLinks">
                  <button className="edit-form__link-edit">
                    <FontAwesomeIcon
                      className="edit-form__link-edit-icon"
                      icon={["fa", "pen-to-square"]}
                    />
                  </button>
                </Link>
                <button
                  className="edit-form__link-delete"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  <FontAwesomeIcon
                    className="edit-form__link-delete-icon"
                    icon={(["fa", "regular"], ["fa", "trash-can"])}
                  />
                </button>
              </div>
            </div>
          </li>
        );
      } else if (icon === "youtube") {
        return (
          <li
            className="edit-form__social-link"
            id="linkEl"
            data-id={link.id}
            key={link.id}
          >
            <div className="edit-form__social-link__icon">
              <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
            </div>
            <div className="edit-form__social-link__info">
              <Link className="link" to="/socialLinks">
                <div className="edit-form__social-link__url">
                  {link.socialLinkURL}
                </div>
              </Link>
              <div className="btn-flex btn-flex__social-link">
                <Link to="/socialLinks">
                  <button className="edit-form__link-edit">
                    <FontAwesomeIcon
                      className="edit-form__link-edit-icon"
                      icon={["fa", "pen-to-square"]}
                    />
                  </button>
                </Link>
                <button
                  className="edit-form__link-delete"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  <FontAwesomeIcon
                    className="edit-form__link-delete-icon"
                    icon={(["fa", "regular"], ["fa", "trash-can"])}
                  />
                </button>
              </div>
            </div>
          </li>
        );
      } else if (icon === "tiktok") {
        return (
          <li
            className="edit-form__social-link"
            id="linkEl"
            data-id={link.id}
            key={link.id}
          >
            <div className="edit-form__social-link__icon">
              <FontAwesomeIcon icon={["fab", "tiktok"]} size="lg" />
            </div>
            <div className="edit-form__social-link__info">
              <Link className="link" to="/socialLinks">
                <div className="edit-form__social-link__url">
                  {link.socialLinkURL}
                </div>
              </Link>
              <div className="btn-flex btn-flex__social-link">
                <Link to="/socialLinks">
                  <button className="edit-form__link-edit">
                    <FontAwesomeIcon
                      className="edit-form__link-edit-icon"
                      icon={["fa", "pen-to-square"]}
                    />
                  </button>
                </Link>
                <button
                  className="edit-form__link-delete"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  <FontAwesomeIcon
                    className="edit-form__link-delete-icon"
                    icon={(["fa", "regular"], ["fa", "trash-can"])}
                  />
                </button>
              </div>
            </div>
          </li>
        );
      } else if (icon === "email") {
        return (
          <li
            className="edit-form__social-link"
            id="linkEl"
            data-id={link.id}
            key={link.id}
          >
            <div className="edit-form__social-link__icon">
              <FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
            </div>
            <div className="edit-form__social-link__info">
              <Link className="link" to="/socialLinks">
                <div className="edit-form__social-link__url">
                  {link.socialLinkURL}
                </div>
              </Link>
              <div className="btn-flex btn-flex__social-link">
                <Link to="/socialLinks">
                  <button className="edit-form__link-edit">
                    <FontAwesomeIcon
                      className="edit-form__link-edit-icon"
                      icon={["fa", "pen-to-square"]}
                    />
                  </button>
                </Link>
                <button
                  className="edit-form__link-delete"
                  onClick={(e) => handleDeleteLink(e)}
                >
                  <FontAwesomeIcon
                    className="edit-form__link-delete-icon"
                    icon={(["fa", "regular"], ["fa", "trash-can"])}
                  />
                </button>
              </div>
            </div>
          </li>
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
