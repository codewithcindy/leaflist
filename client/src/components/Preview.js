import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Preview({ userData }) {
  console.log(userData);

  const { saveUserDataToDB } = useContext(FormContext);

  // Check if links is empty
  const links = userData.links
    ? userData.links.map((link) => {
        return <li key={link.id}>{link.linkText}</li>;
      })
    : "";

  // Check if ssocial links is empty
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

  const profileURL = userData.profileImageSrc
    ? userData.profileImageSrc.url
    : "https://res.cloudinary.com/codewithcindy/image/upload/v1664308604/Leaflist/default_image_xof5dp.png";

  function handleFinalSave(e) {
    e.preventDefault();

    // display final product - same as preview but no btns

    // pass data to App to save data to mongo
    saveUserDataToDB("finalSave");
  }

  return (
    <div className="preview-container">
      <form
        className="form preview__form"
        onSubmit={(e) => handleFinalSave(e)}
        action="/save"
        method="POST"
        // enctype="multipart/for m-data"
      >
        {/* <input
            type="file"
            name="profileImageSrc"
            value={userData.profileImageSrc}
            hidden
            onChange={() => {}}
          ></input> */}
        <img
          className="preview__profile-image"
          src={profileURL}
          alt="Profile Image"
        />
        <h1 className="preview__heading">{userData.heading || ""}</h1>
        <p className="preview__subHeading">{userData.subHeading || ""}</p>
        <p className="preview__description">{userData.description || ""}</p>
        <ul className="preview__links">{links}</ul>
        <ul className="preview__socialLinks">{socialLinks}</ul>
        <div className="preview__btns">
          <Link to="/edit">
            <button className="btn btn-back">Back</button>
          </Link>
          <button
            // onClick={(e) => handleFinalSave(e)}
            type="submit"
            className="btn btn-final"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
