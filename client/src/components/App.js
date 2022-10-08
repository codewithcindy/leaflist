import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import Register from "./Register";
import EditForm from "./EditForm";
import LinksForm from "./editComponents/LinksForm";
import SocialLinksForm from "./editComponents/SocialLinksForm";
import Preview from "./Preview";
import Final from "./Final";
import Navbar from "./Navbar";
import "../css/app.css";
import axios from "axios";
import PrivateRoutes from "./utils/PrivateRoutes";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab, fas, faEnvelope);

// Set up Context
export const FormContext = React.createContext();

function App() {
  // State for user info
  const [userData, setUserData] = useState(" ");

  // State for error messages
  const [errMsg, setErrMsg] = useState({
    registerErr: "",
    loginErr: "",
  });

  // State for user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // Connect to API
  // useEffect(() => {
  //   const controller = new AbortController();

  //   axios
  //     .get("/", {
  //       signal: controller.signal,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log("Connected to backend");
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  /****************************    Register   *******************************/
  async function handleRegisterFormSubmit(formData) {
    // Send register form data to node
    axios
      .post("http://localhost:8080/registerUser", formData, {
        withCredentials: true,
      })
      .then((res) => {
        // Update userData to be the new user
        setUserData(res.data);

        // Update isLoggedIn state for protected routes
        setIsLoggedIn(true);

        // Re route user to edit page
        navigate("/edit");
      })
      .catch((e) => {
        // Set registration error message
        const errMsg = {
          registerErr: e.response.data,
        };

        // Update errMsg state
        setErrMsg(errMsg);
      });
  }

  /****************************    Login    *******************************/

  function handleLoginFormSubmit(formData) {
    console.log(`formdata`, formData);

    axios
      .post("http://localhost:8080/login", formData)
      .then((res) => {
        const user = res.data;
        setUserData(user);
        setIsLoggedIn(true);

        navigate("/edit");
      })

      .catch((e) => {
        const errMsg = {
          loginErr: "Invalid username or password.",
        };
        setErrMsg(errMsg);
      });
  }

  /*************************    Log Out   ****************************/

  function handleLogOut() {
    axios
      .post("/logout")
      .then((res) => navigate("/login"))
      .catch((e) => console.log(e));
  }

  /*************************    Profile Image    ****************************/

  function handleImageUpload(formData) {
    axios
      .post("http://localhost:8080/uploadImage", formData)
      .then((res) => {
        const file = res.data;

        const newUserData = { ...userData };
        newUserData.profileImageSrc = {
          url: file.path,
          filename: file.filename,
        };

        setUserData(newUserData);
      })
      .catch((e) => console.log("error connecting to route", e));
  }

  /****************************    Heading    *******************************/

  // Update heading
  function handleHeadingChange(changes) {
    const newUserData = { ...userData };
    setUserData({ ...newUserData, ...changes });
  }

  /****************************    Links    *******************************/

  function handleLinksListChange(updatedLinks) {
    const newUserData = { ...userData };
    newUserData.links = updatedLinks;
    setUserData(newUserData);
  }

  // Update user data with new links
  function handleLinksSubmit(links) {
    const newUserData = { ...userData };
    newUserData.links = links;
    setUserData(newUserData);
  }

  /****************************  SocialLinks  *******************************/
  function handleSocialLinksListChange(updatedLinks) {
    const newUserData = { ...userData };
    newUserData.socialLinks = updatedLinks;
    setUserData(newUserData);
  }

  function handleSocialLinksSubmit(links) {
    const newUserData = { ...userData };
    newUserData.socialLinks = links;
    setUserData(newUserData);
  }

  /****************************    Preview    *******************************/

  /****************************    Final    *******************************/

  async function saveUserDataToDB() {
    axios
      .post("http://localhost:8080/save", userData)
      .then((res) => console.log(res))
      .catch((e) => console.log("e", e));

    navigate("/final");
  }

  /****************************    Context    *******************************/

  const FormContextValue = {
    errMsg,
    userData,
    isLoggedIn,
    handleRegisterFormSubmit,
    handleLoginFormSubmit,
    handleLogOut,
    handleImageUpload,
    handleHeadingChange,
    handleLinksListChange,
    handleSocialLinksListChange,
    handleLinksSubmit,
    handleSocialLinksSubmit,
    saveUserDataToDB,
  };

  return (
    <div className="main-container">
      <FormContext.Provider value={FormContextValue}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/edit/*" element={<EditForm />} />
            <Route path="/links" element={<LinksForm />} exact />
            <Route path="/socialLinks" element={<SocialLinksForm />} exact />
            <Route
              path="/preview"
              element={<Preview userData={userData} />}
              exact
            />
            <Route
              path="/final"
              element={<Final userData={userData} />}
              exact
            />
          </Route>
        </Routes>
      </FormContext.Provider>
    </div>
  );
}

export default App;
