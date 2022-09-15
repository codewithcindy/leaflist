import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";

export default function FinalPage({ userData }) {
  const { saveUserDataToDB } = useContext(FormContext);

  const [isDataSaved, setIsDataSaved] = useState(false);

  function handleFinalSave(e) {
    e.preventDefault();

    // display final product - same as preview but no btns

    // pass data to App to save data to mongo
    saveUserDataToDB(userData);
  }

  return (
    <div className="preview-container">
      <img src={userData.profileImageSrc.url} alt="Profile Image" />
      <h1>{userData.heading}</h1>
      <p>{userData.subHeading}</p>
      <p>{userData.description}</p>
      <ul>
        {userData.links.map((link) => {
          return <li key={link.id}>{link.linkText}</li>;
        })}
      </ul>
      <ul>
        {userData.socialLinks.map((link) => {
          return (
            <li key={link.id}>
              <a href={link.socialLinkURL}>{link.socialLinkIcon}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
