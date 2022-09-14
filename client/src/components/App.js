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
import "../css/app.css";
import axios from "axios";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab, fas, faEnvelope);

// Set up Context
export const FormContext = React.createContext();

function App() {
  // set state for user info
  const [userData, setUserData] = useState("");

  const [message, setMessage] = useState("");

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

  /****************************    Register   *******************************/
  async function handleRegisterFormSubmit(formData) {
    console.log("front end form data");

    // Send register form data to node
    const result = await axios.post(
      "http://localhost:8080/registerUser",
      formData,
      { withCredentials: true }
    );

    console.log(result.data);
    setUserData(result.data);

    // Re route user to edit page
    navigate("/edit");
  }

  /****************************    Login    *******************************/

  function handleLoginFormSubmit(formData) {
    axios
      .post("http://localhost:8080/loginUser", formData)
      .then((res) => {
        const user = res.data;
        setUserData(user); // setUserData(res.data.user);
        navigate("/edit");
      })
      .catch((e) => {
        setMessage("Invalid username or password. Please try again.");
      });
  }

  /*************************    Profile Image    ****************************/

  function handleImageUpload(imageFile) {
    // axios
    //   .post("http://localhost:8080/uploadImage", { profileImageSrc })
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log("error connecting to route", e));
    // const newUserData = { ...userData };
    // newUserData.profileImageSrc = profileImageSrc;
    // setUserData({ ...userData, ...newUserData });
  }

  /****************************    Heading    *******************************/

  // Update heading
  function handleHeadingChange(changes) {
    const newUserData = { ...userData };
    setUserData({ ...newUserData, ...changes });
  }

  /****************************    Links    *******************************/

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

    console.log(userData);
  }

  /****************************    Preview    *******************************/

  // function handlePreviewPage() {
  //   setUpdatedUserData(userData);
  // }

  /****************************    Final    *******************************/

  async function saveUserDataToDB(userData) {
    axios
      .post("http://localhost:8080/save", userData)
      .then((res) => console.log(res))
      .catch((e) => console.log("e", e));

    navigate("/final");
  }

  /****************************    Context    *******************************/

  const FormContextValue = {
    message,
    userData,
    handleRegisterFormSubmit,
    handleLoginFormSubmit,
    handleImageUpload,
    handleHeadingChange,
    handleLinksSubmit,
    handleSocialLinksSubmit,
    // handlePreviewPage,
    saveUserDataToDB,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element=<EditForm /> />
        <Route path="/links" element={<LinksForm />} />
        <Route path="/socialLinks" element={<SocialLinksForm />} />
        <Route path="/preview" element={<Preview userData={userData} />} />
        <Route path="/final" element={<Final userData={userData} />} />
      </Routes>
    </FormContext.Provider>
  );
}

// const sampleData = {
//   id: 1,
//   email: "GusGus@cat.me",
//   password: "12345",
//   heading: "catlady1234",
//   subHeading: "i like black cats",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tellus maximus, faucibus risus et, vehicula est. Aenean commodo massa nunc, a tempor est lobortis cursus.",
//   links: [
//     { id: 1, linkText: "Amazon Storefront", linkURL: "wnetfgineg" },
//     {
//       id: 2,
//       linkText: "Favorite recipes",
//       linkURL: "efnegnekg",
//     },
//   ],
//   socialLinks: [
//     {
//       id: 1,
//       socialLinkIconName: "Instagram",
//       socialLinkURL: "instagram.com",
//     },
//     {
//       id: 2,
//       socialLinkIconName: "Youtube",
//       socialLinkURL: "youtube.com",
//     },
//   ],
//   profileImage: "/../img/catdesk.jpeg",
// };

export default App;
