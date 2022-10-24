import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FormContext } from "../App";

// export const LinkContext = React.createContext();

export default function LinksList({ linksData }) {
  const { handleLinksListChange } = useContext(FormContext);

  function handleDeleteLink(e) {
    const linkToDelete = e.target.closest("#linkEl").dataset.id;
    const updatedLinks = linksData.filter((link) => link.id !== linkToDelete);
    console.log(updatedLinks);

    handleLinksListChange(updatedLinks);
  }

  // const LinkContextValue = {
  //   handleDeleteLink,
  // };

  let links;

  if (!linksData) {
    links = [];
  } else {
    links = linksData.map((link) => {
      return (
        <li
          id="linkEl"
          className="edit-form__link"
          key={link.id}
          data-id={link.id}
        >
          <Link className="link" to="/links">
            <div className="edit-form__link-text">
              {link.linkText ? link.linkText : link.linkURL}
            </div>
          </Link>
          {/* <div>{link.linkURL}</div> */}
          <div className="btn-flex btn-flex__link">
            <Link to="/links">
              <button className="edit-form__link-edit">
                <FontAwesomeIcon
                  className="edit-form__link-edit-icon"
                  icon={["fa", "pen-to-square"]}
                />
              </button>
            </Link>
            <button
              className="edit-form__link-delete"
              onClick={(e) => handleDeleteLink(e)}
            >
              <FontAwesomeIcon
                className="edit-form__link-delete-icon"
                icon={(["fa", "regular"], ["fa", "trash-can"])}
              />
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    // <LinkContext.Provider value={LinkContextValue}>
    <div className="edit-form__section edit-form__section-links">
      <label className="edit-form__label">Links</label>
      <ul>{links}</ul>
      <Link to="/links">
        <button className="edit-form__section-links__add-btn">+</button>
      </Link>
    </div>
    // </LinkContext.Provider>
  );
}
