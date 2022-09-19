import React, { useContext } from "react";
import { FormContext } from "../App";

export default function Description({ description }) {
  const { handleHeadingChange } = useContext(FormContext);

  function handleChange(changes) {
    handleHeadingChange(changes);
  }

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
        max-length="50"
        value={description ? description : ""}
        autoComplete="off"
        onChange={(e) => handleChange({ description: e.target.value })}
      ></textarea>
    </div>
  );
}
