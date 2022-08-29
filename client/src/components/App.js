import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import Register from "./Register";
import EditForm from "./EditForm";
import LinksForm from "./editComponents/LinksForm";
import SocialLinksForm from "./editComponents/SocialLinksForm";
import FinalPage from "./FinalPage";
import "../css/app.css";
import { v4 as uuidv4 } from "uuid";

// Set up Context
export const FormContext = React.createContext();

function App() {
  // set state for user info
  const [userData, setUserData] = useState(sampleData);

  const [updatedUserData, setUpdatedUserData] = useState("");

  // Connect to backend
  useEffect(() => {
    fetch("/").then((res) => console.log("Connected to backend"));
  }, []);

  // Update heading
  function handleHeadingChange(changes) {
    const newUserData = { ...userData };
    setUserData({ ...newUserData, ...changes });
    console.log(userData);
    console.log(`updated user w heading: ${userData}`);
  }

  // Update user data with new links
  function handleLinksSubmit(links) {
    const newUserData = { ...userData };
    newUserData.links = links;
    setUserData(newUserData);
  }

  function handleSocialLinksSubmit(links) {
    const newUserData = { ...userData };
    newUserData.socialLinks = links;
    setUserData(newUserData);
  }

  function handlePreviewPage() {
    setUpdatedUserData(userData);

    console.log();
  }

  const FormContextValue = {
    userData,
    handleHeadingChange,
    handleLinksSubmit,
    handleSocialLinksSubmit,
    handlePreviewPage,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {/* {alert(`${data}`)} */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/links" element={<LinksForm />} />
          <Route path="/socialLinks" element={<SocialLinksForm />} />
          <Route path="/preview" element={<FinalPage userData={userData} />} />
        </Routes>
      </Router>
    </FormContext.Provider>
  );
}

const sampleData = {
  id: 1,
  username: "Gus Gus",
  links: [
    { id: 1, linkText: "Amazon Storefront", linkURL: "wnetfgineg" },
    {
      id: 2,
      linkText: "Favorite recipes",
      linkURL: "efnegnekg",
    },
  ],
  socialLinks: [
    {
      id: 1,
      socialLinkIcon: "Instagram",
      socialLinkURL: "klefgegbeg",
    },
  ],
  profileImage: "/../img/catdesk.jpeg",
};

export default App;
