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

// Config axios
const api = axios.create({
  baseURL: "http://localhost:8080",
});

function App() {
  // set state for user info
  const [userData, setUserData] = useState("");
  const [userLogin, setUserLogin] = useState("");

  const [errMsg, setErrMsg] = useState({
    registerErr: "",
    loginErr: "",
  });
  // const [registerErrorMsg, setRegisterErrorMsg] = useState("");
  // const [loginErrorMsg, setLoginErrorMsg] = useState("");

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

  /*****************   User Authorization   ***********************/

  // // Get user
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   function getUser() {
  //     try {
  //       api.get("/", { signal: controller.signal }).then((res) => {
  //         console.log(res.data);
  //         isMounted && setUserData(res.data);
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }

  //   getUser();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, [userLogin]);

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
        // Re route user to edit page
        navigate("/edit");
      })
      .catch((e) => {
        const errMsg = {
          registerErr: "A user with that email already exists.",
        };
        setErrMsg(errMsg);
        console.log(errMsg);
      });
  }

  /****************************    Login    *******************************/

  // function handleLoginUser(data) {
  //   const controller = new AbortController();

  //   axios.get("/", { signal: controller.signal }).then((res) => {
  //     console.log(res.data);
  //   });
  // }

  function handleLoginFormSubmit(formData) {
    console.log("frotn end login data", formData);

    axios
      .post("http://localhost:8080/login", formData)
      .then((res) => {
        const user = res.data;

        console.log("res", res);
        console.log("res data", user);
        // setUserLogin(user);
        setUserData(user); // setUserData(res.data.user);
        navigate("/edit");
      })
      .catch((e) => {
        console.log(e);
        const errMsg = {
          loginErr: "Invalid username or password. Please try again.",
        };
        setErrMsg(errMsg);
        console.log(errMsg);
      });
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

    console.log(userData);
  }

  /****************************    Preview    *******************************/

  // function handlePreviewPage() {
  //   setUpdatedUserData(userData);
  // }

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
    handleRegisterFormSubmit,
    handleLoginFormSubmit,
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
