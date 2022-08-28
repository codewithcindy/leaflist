import React from "react";

export default function Heading() {
  return (
    <div className="edit-form__section">
      <label className="edit-form__label" htmlFor="heading">
        Heading
      </label>
      <input
        className="edit-form__input"
        type="text"
        name="heading"
        id="heading"
      />
    </div>
  );
}
