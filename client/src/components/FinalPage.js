import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./App";

export default function FinalPage({ userData }) {
  const { saveUserDataToDB } = useContext(FormContext);

  function handleFinalSave() {
    // display final product - same as preview but no btns

    // pass data to App to save data to mongo
    saveUserDataToDB();

    console.log("save!");
  }

  return (
    <div className="preview-container">
      <img src={userData.profileImage} alt="Profile Image" />

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

      <div className="">
        <Link to="/edit">
          <button className="btn btn-back">Back</button>
        </Link>
        <button
          onClick={() => handleFinalSave()}
          type="submit"
          className="btn btn-final"
        >
          Save
        </button>
      </div>
    </div>
  );
}
