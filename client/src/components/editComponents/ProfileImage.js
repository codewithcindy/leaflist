import React from "react";

export default function ProfileImage({ profileImage }) {
  function handleFileSelect(file) {
    console.log(file);
  }

  return (
    <div className="edit-form__section edit-form__section-image">
      {console.log(profileImage)}
      <div className="edit-form--circle">
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
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
      </div>
    </div>
  );
}
