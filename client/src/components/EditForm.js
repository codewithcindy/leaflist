import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileImage from "./editComponents/ProfileImage";
import Heading from "./editComponents/Heading";
import SubHeading from "./editComponents/SubHeading";
import Description from "./editComponents/Description";
import LinksList from "./editComponents/LinksList";

import SocialLinksList from "./editComponents/SocialLinksList";
import { FormContext } from "./App";

export default function EditForm() {
  const { userData, saveUserDataToDB } = useContext(FormContext);

  return (
    <div className="edit-form-container">
      <div className="form edit-form">
        <ProfileImage profileImage={userData.profileImageSrc} />
        <Heading heading={userData.heading} />
        <SubHeading subHeading={userData.subHeading} />
        <Description description={userData.description} />
        <LinksList linksData={userData.links} />
        <SocialLinksList socialLinksData={userData.socialLinks} />

        <Link to="/preview">
          <button type="submit" className="btn btn-preview">
            Preview
          </button>
        </Link>
        <button className="btn" onClick={saveUserDataToDB}>
          Save
        </button>
      </div>
    </div>
  );
}
