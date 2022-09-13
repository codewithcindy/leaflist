import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function handleEditFormSubmit(e) {
    e.preventDefault();
    navigate("/preview");
  }

  console.log(userData);

  return (
    <div className="edit-form-container">
      {/* <div>{userData.username}</div> */}
      <form className="edit-form" onSubmit={(e) => handleEditFormSubmit(e)}>
        <ProfileImage profileImage={userData.profileImageSrc} />
        <Heading heading={userData.heading} />
        <SubHeading subHeading={userData.subHeading} />
        <Description description={userData.description} />
        <LinksList linksData={userData.links} />
        <SocialLinksList socialLinksData={userData.socialLinks} />

        <button type="submit" className="btn btn-preview">
          Preview
        </button>
      </form>
    </div>
  );
}
