import React, { useContext, useRef } from "react";
import { FormContext } from "../App";

export default function ProfileImage({ profileImage }) {
  const { userData, handleImageUpload } = useContext(FormContext);

  // function getBase64Image(image) {
  //   const canvas = React.createElement("canvas");
  //   canvas.width = image.width;
  //   canvas.height = image.height;

  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(image, 0, 0);

  //   const dataURL = canvas.toDataURL("image/png");

  //   return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  // }
  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       // Convert file to base64 string
  //       const base64String = reader.result
  //         .replace("data:", "")
  //         .replace(/^.+,/, "");

  //       // Save file to localStorage
  //       localStorage.setItem("imageFileLocal", base64String);

  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     // localStorage.setItem("image", reader.result);
  //     reader.readAsDataURL(file);
  //   });
  // }

  function handleImageUpdate(imageBase64) {
    // Get image file from localStorage
    // const image = localStorage.getItem("imageFileLocal");

    // Set user's profile image src to equal the image from localStorage
    // const newUserData = { ...userData };

    // const profileImageSrc = "data:image/png;base64," + imageBase64;

    handleImageUpload(profileImageSrc);
  }

  const profileImageForm = useRef(null);

  function handleChange(e) {
    profileImageForm.current.submit(e);
    // console.log(e);

    // handleImageUpload(e);
    // console.log(e.target.files[0]);
    // const profileImageForm
    // console.log(file);
    // const imageFile = e.target.files[0];
    // handleImageUpload(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(imageFile);
    // reader.onload = () => {
    //   // Convert file to base64 string
    //   const base64String = reader.result
    //     .replace("data:", "")
    //     .replace(/^.+,/, "");
    //   console.log(typeof base64String);
    //   handleImageUpdate(base64String);
    //   // Save file to localStorage
    //   // localStorage.setItem("imageFileLocal", base64String);
    // };
    // reader.onerror = (error) => {
    //   console.log(error);
    // };
  }

  return (
    <div className="edit-form__section edit-form__section-image">
      <div className="edit-form--circle">
        <form
          ref={profileImageForm}
          action="/uploadImage"
          method="post"
          encType="multipart/form-data"
          // onSubmit={(e) => handleChange(e)}
        >
          <label
            className="edit-form__label edit-form__label-image"
            htmlFor="profileImage"
          >
            {profileImage ? (
              <img
                className="edit-form__profile-image"
                src={profileImage}
                alt="cat desk"
              />
            ) : (
              "Image"
            )}
          </label>
          <input
            className="edit-form__input-image"
            type="file"
            name="profileImage"
            id="profileImage"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
    </div>
  );
}
