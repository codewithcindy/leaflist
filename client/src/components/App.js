import React, { useState } from "react";
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

  // Define API endpoint
  let api;
  process.env.NODE_ENV === "production"
    ? (api = process.env.REACT_APP_API_URL)
    : (api = "http://localhost:8080");
  /****************************    Register   *******************************/
  async function handleRegisterFormSubmit(formData) {
    // Send register form data to node
    axios
      .post(`${api}/registerUser`, formData, {
        // .post(`/registerUser`, formData, {
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

  async function handleLoginFormSubmit(formData) {
    axios({
      method: "post",
      url: `/login`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
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
        console.log(e);
      });
  }

  /*************************    Log Out   ****************************/

  function handleLogOut() {
    axios
      .post(`${api}/logout`)
      // .post(`/logout`)

      .then((res) => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((e) => console.log(e));
  }

  /*************************    Profile Image    ****************************/

  function handleImageUpload(formData) {
    axios
      .post(`${api}/uploadImage`, formData)
      // .post(`/uploadImage`, formData)

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
    console.log(`updatedlinks in app`, updatedLinks);

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

  /****************************    Final    *******************************/

  async function saveUserDataToDB(saveType) {
    if (saveType === "finalSave") {
      // Save from preview page
      axios
        .post(`${api}/save`, userData)
        // .post(`/save`, userData)

        .then((res) => console.log(res))
        .catch((e) => console.log("e", e));

      navigate("/final");
    } else {
      // Save from edit form
      axios
        .post(`${api}/save`, userData)
        // .post(`/save`, userData)

        .then((res) => console.log(res))
        .catch((e) => console.log("e", e));

      navigate("/login");
    }
  }

  /****************************    Errors    *******************************/

  function clearErrors() {
    setErrMsg({
      registerErr: "",
      loginErr: "",
    });
  }

  /****************************    Context    *******************************/

  const FormContextValue = {
    errMsg,
    clearErrors,
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
