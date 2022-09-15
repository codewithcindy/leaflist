import React, { useContext, useRef } from "react";
import { FormContext } from "../App";

export default function ProfileImage({ profileImage }) {
  const { userData, handleImageUpload } = useContext(FormContext);

  const profileImageForm = useRef(null);

  function handleChange(e) {
    const formData = new FormData(profileImageForm.current);

    handleImageUpload(formData);
  }

  return (
    <div className="edit-form__section edit-form__section-image">
      <div className="edit-form--circle">
        <form
          ref={profileImageForm}
          action="http://localhost:8080/uploadImage"
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
                src={profileImage.url}
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
