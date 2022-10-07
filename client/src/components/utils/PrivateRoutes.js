import axios from "axios";
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FormContext } from "../App";

export default function PrivateRoutes() {
  const { userData, isLoggedIn } = useContext(FormContext);

  // Check server for session
  // const auth = axios
  //   .get("/userAuth")
  //   .then((res) => {
  //     console.log(res);
  //     return res.data;
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     return;
  //   });

  // console.log(`private route isloggedin`, isLoggedIn);

  // let auth = localStorage.getItem("session");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
