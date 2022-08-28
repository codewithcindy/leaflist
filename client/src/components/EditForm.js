import React, { useContext } from "react";
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
  const { userData } = useContext(FormContext);

  return (
    <div className="edit-form-container">
      <form className="edit-form">
        <ProfileImage profileImage={userData.profileImage} />
        <Heading />
        <SubHeading />
        <Description />
        <LinksList linksData={userData.links} />
        <SocialLinksList socialLinksData={userData.socialLinks} />

        <button className="btn">Preview</button>
      </form>
    </div>
  );
}
