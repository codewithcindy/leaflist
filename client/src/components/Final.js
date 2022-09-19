import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";

export default function FinalPage({ userData }) {
  const links = userData.links
    ? userData.links.map((link) => {
        return <li key={link.id}>{link.linkText}</li>;
      })
    : "";

  const socialLinks = userData.socialLinks
    ? userData.socialLinks.map((link) => {
        const icon = link.socialLinkIcon.toLowerCase();

        if (icon === "twitter") {
          return (
            <Link className="link" to="/socialLinks" key={link.id}>
              <li className="edit-form__social-link">
                <div className="edit-form__social-link__icon">
                  <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
                </div>
              </li>
            </Link>
          );
        } else if (icon === "instagram") {
          return (
            <Link className="link" to="/socialLinks" key={link.id}>
              <li className="edit-form__social-link">
                <div className="edit-form__social-link__icon">
                  <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
                </div>
              </li>
            </Link>
          );
        } else if (icon === "youtube") {
          return (
            <Link className="link" to="/socialLinks" key={link.id}>
              <li className="edit-form__social-link">
                <div className="edit-form__social-link__icon">
                  <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
                </div>
              </li>
            </Link>
          );
        } else if (icon === "tiktok") {
          return (
            <Link className="link" to="/socialLinks" key={link.id}>
              <li className="edit-form__social-link">
                <div className="edit-form__social-link__icon">
                  <FontAwesomeIcon icon={["fab", "tiktok"]} size="lg" />
                </div>
              </li>
            </Link>
          );
        } else if (icon === "envelope") {
          return (
            <Link className="link" to="/socialLinks" key={link.id}>
              <li className="edit-form__social-link">
                <div className="edit-form__social-link__icon">
                  <FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
                </div>
              </li>
            </Link>
          );
        }
      })
    : "";

  return (
    <div className="preview-container">
      <form className="preview__form" action="/save" method="POST">
        <img
          className="preview__profile-image"
          src={
            userData.profileImageSrc.url
              ? userData.profileImageSrc.url
              : "../../public/img/default_image.png"
          }
          alt="Profile Image"
        />
        <h1 className="preview__heading">{userData.heading || ""}</h1>
        <p className="preview__subHeading">{userData.subHeading || ""}</p>
        <p className="preview__description">{userData.description || ""}</p>
        <ul className="preview__links">{links}</ul>
        <ul className="preview__socialLinks">{socialLinks}</ul>
      </form>
    </div>
  );
}
