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
      <div className="">
        <form
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
          <img src={userData.profileImageSrc || "NO IMG"} alt="Profile Image" />
          <h1>{userData.heading || ""}</h1>
          <p>{userData.subHeading || ""}</p>
          <p>{userData.description || ""}</p>
          <ul>
            {userData.links
              ? userData.links.map((link) => {
                  return <li key={link.id}>{link.linkText}</li>;
                })
              : ""}
          </ul>
          <ul>
            {userData.socialLinks
              ? userData.socialLinks.map((link) => {
                  return (
                    <li key={link.id}>
                      <a href={link.socialLinkURL}>{link.socialLinkIcon}</a>
                    </li>
                  );
                })
              : ""}
          </ul>
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
        </form>
      </div>
    </div>
  );
}
