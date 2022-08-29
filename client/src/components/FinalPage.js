import React from "react";
import ProfileImage from "./finalComponents/ProfileImage";
import Heading from "./finalComponents/Heading";
import SubHeading from "./finalComponents/SubHeading";
import Description from "./finalComponents/Description";
import LinksList from "./finalComponents/LinksList";
import SocialLinksList from "./finalComponents/SocialLinksList";

export default function FinalPage({ userData }) {
  return (
    <div className="final-container">
      <h2>PREVIEW</h2>

      {/* {/* <ProfileImage /> */}
      <img src={userData.ProfileImage} alt="Profile Image" />

      {/* <Heading /> */}
      <h1></h1>

      {/* <SubHeading /> */}
      {/* <Description /> */}
      {/* <LinksList /> */}
      {/* <SocialLinksList /> */}

      <button type="submit" className="btn">
        Save
      </button>
    </div>
  );
}
