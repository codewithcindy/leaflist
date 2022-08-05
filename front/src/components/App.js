import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import Register from "./Register";
import EditForm from "./EditForm";
import LinksForm from "./editComponents/LinksForm";
import SocialLinksForm from "./editComponents/SocialLinksForm";
import "../css/app.css";
import { v4 as uuidv4 } from "uuid";

// Set up Context
export const FormContext = React.createContext();

function App() {
  // set state for user info
  const [userData, setUserData] = useState(sampleData);

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

  const FormContextValue = {
    userData,
    handleLinksSubmit,
    handleSocialLinksSubmit,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="/links" element={<LinksForm />} />
          <Route path="/socialLinks" element={<SocialLinksForm />} />
        </Routes>
      </Router>
    </FormContext.Provider>
  );
}

const sampleData = {
  id: 1,
  username: "Gus Gus",
  links: [
    { id: uuidv4(), linkText: "Amazon Storefront", linkURL: "wnetfgineg" },
    {
      id: uuidv4(),
      linkText: "Favorite recipes",
      linkURL: "efnegnekg",
    },
  ],
  socialLinks: [
    { id: uuidv4(), socialLinkIcon: "Instagram", socialLinkURL: "klefgegbeg" },
  ],
};

export default App;
