import React from "react";

export default function Description() {
  return (
    <div>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        cols="20"
      ></textarea>
    </div>
  );
}
