import React from "react";

export default function Description() {
  return (
    <div className="edit-form__section">
      <label className="edit-form__label" htmlFor="description">
        Description
      </label>
      <textarea
        className="edit-form__input"
        name="description"
        id="description"
        rows="5"
        cols="20"
      ></textarea>
    </div>
  );
}
