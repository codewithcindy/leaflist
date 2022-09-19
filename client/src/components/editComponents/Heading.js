import React, { useContext } from "react";
import { FormContext } from "../App";

export default function Heading({ heading }) {
  const { handleHeadingChange } = useContext(FormContext);

  function handleChange(changes) {
    // const newHeading = { ...heading, ...changes };
    // console.log(newHeading);
    handleHeadingChange(changes);
  }

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
        autoComplete="off"
        value={heading ? heading : ""}
        onChange={(e) => handleChange({ heading: e.target.value })}
      />
    </div>
  );
}
