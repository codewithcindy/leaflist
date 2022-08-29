import React from "react";

export default function SubHeading() {
  return (
    <div className="edit-form__section">
      <label className="edit-form__label" htmlFor="subHeading">
        Sub-heading
      </label>
      <input
        className="edit-form__input"
        type="text"
        name="subHeading"
        id="subHeading"
      />
    </div>
  );
}
