import React from "react";
import { Link } from "react-router-dom";

export default function SocialLinksList(props) {
  const { socialLinksData } = props;

  return (
    <div>
      <label>Social Links</label>
      <ul>
        {socialLinksData.map((link) => {
          return <li key={link.id}>{link.socialLinkURL}</li>;
        })}
      </ul>
      <Link to="/socialLinks">
        <button>+</button>
      </Link>
    </div>
  );
}
