import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "./editComponents/ProfileImage";
import Heading from "./editComponents/Heading";
import SubHeading from "./editComponents/SubHeading";
import Description from "./editComponents/Description";
import LinksList from "./editComponents/LinksList";
import SocialLinksList from "./editComponents/SocialLinksList";
import { FormContext } from "./App";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Links from "./editComponents/Links";

export default function EditForm() {
  const { userData, displayPreview } = useContext(FormContext);

  return (
    <div className="edit-form-container">
      <div className="edit-form">
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
      </div>
    </div>
  );
}
