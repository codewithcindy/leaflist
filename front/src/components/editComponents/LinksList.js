import React from "react";
import { Link } from "react-router-dom";

export default function LinksList(props) {
  const { linksData } = props;
  // const linksArray = linksData.map((data) => console.log(data));

  return (
    <div>
      <h4>Links</h4>
      <ul>
        {linksData.map((link) => {
          return <li key={link.id}>{link.linkText}</li>;
        })}
      </ul>
      <Link to="/links">
        <button>+</button>
      </Link>
    </div>
  );
}
