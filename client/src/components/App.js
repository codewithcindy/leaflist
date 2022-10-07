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
  // set state for user info
  const [userData, setUserData] = useState(" ");

  const [errMsg, setErrMsg] = useState({
    registerErr: "",
    loginErr: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // Connect to API
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/", {
        signal: controller.signal,
      })
      .then((res) => {
        console.log("Connected to backend");
      });

    return () => {
      controller.abort();
    };
  }, []);

  // Update session
  // useEffect(() => {
  //   const controller = new AbortController();

  //   axios
  //     .post("/updateSession", userData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, [userData]);

  /****************************    Register   *******************************/
  async function handleRegisterFormSubmit(formData) {
    console.log("front end registeatoin data");
    console.log(formData);

    // Send register form data to node
    axios
      .post("http://localhost:8080/registerUser", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data);
        setIsLoggedIn(true);
        // Re route user to edit page
        navigate("/edit");
      })
      .catch((e) => {
        console.log(e.response.data);

        const errMsg = {
          registerErr: e.response.data,
        };
        setErrMsg(errMsg);
        console.log(errMsg);
      });
  }

  /****************************    Login    *******************************/

  function handleLoginFormSubmit(formData) {
    axios
      .post("http://localhost:8080/login", formData)
      .then((res) => {
        const user = res.data;
        setUserData(user);
        setIsLoggedIn(true);

        // Save user to localStorage
        // localStorage.setItem("session", user.username);

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
    // axios
    //   .post("http://localhost:8080/save", userData)
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log("e", e));

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
    // handleLoginUser,
    handleImageUpload,
    handleHeadingChange,
    handleLinksListChange,
    handleLinksSubmit,
    handleSocialLinksSubmit,
    // handlePreviewPage,
    saveUserDataToDB,
  };

  return (
    <div className="main-container">
      <FormContext.Provider value={FormContextValue}>
        {/* <Nav /> */}
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
