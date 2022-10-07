import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import ProfileImage from "./editComponents/ProfileImage";
import Heading from "./editComponents/Heading";
import SubHeading from "./editComponents/SubHeading";
import Description from "./editComponents/Description";
import LinksList from "./editComponents/LinksList";

import SocialLinksList from "./editComponents/SocialLinksList";
import { FormContext } from "./App";
import axios from "axios";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Links from "./editComponents/Links";

export default function EditForm() {
  const { isLoggedIn, userData, displayPreview, handleLogOut } =
    useContext(FormContext);

  // function handleClickogOut() {
  //     axios
  //       .post("/logout")
  //       .then((res) => console.log(res))
  //       .catch((e) => console.log(e));
  // }

  console.log(userData);

  return (
    <div className="edit-form-container">
      <button onClick={(e) => handleLogOut(e)}>Log Out</button>
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
      </div>

      {/* <Routes>
        <Route path="/links" element={<LinksForm />} exact />
      </Routes> */}
    </div>
  );
}
