import React, { useContext } from "react";
import { FormContext } from "../App";

export default function SubHeading({ subHeading }) {
  const { handleHeadingChange } = useContext(FormContext);

  function handleChange(changes) {
    handleHeadingChange(changes);
  }

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
        value={subHeading ? subHeading : ""}
        onChange={(e) => handleChange({ subHeading: e.target.value })}
      />
    </div>
  );
}
