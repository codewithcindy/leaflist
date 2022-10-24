import React, { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../App";

export default function NewSocialLink(props) {
  const {
    linkInfo,
    linkURL,
    handleLinkInputChange,
    handleLinkSelect,
    updateLinksForm,
    linkSelectedId,
    currentLinks,
  } = props;
  const { handleSocialLinksListChange } = useContext(FormContext);

  // const [active, setActive] = useState(false);
  // const [icon, setIcon] = useState("");

  const [linkId, setLinkId] = useState(linkInfo.id);

  function handleURLChange(e) {
    const urlChange = { socialLinkURL: e.target.value };

    handleLinkInputChange(linkInfo.id, {
      ...linkInfo,
      ...urlChange,
    });
  }

  function handleIconChange(e) {
    // Set selected link
    // handleLinkSelect(id);

    // Updated socialLinkIcon
    const iconChange = { socialLinkIcon: e.currentTarget.dataset["name"] };

    // Element of selected link/div
    if (linkSelectedId) {
      const selectedLinkEl = document.querySelector(
        `[data-id='${linkSelectedId}'`
      );
      // Array of all icon elements
      const iconElementsArr = selectedLinkEl.querySelectorAll(
        `.social-links__icon,[data-id='${linkSelectedId}' `
      );
      // Element of selected icon
      let iconEl = e.currentTarget;

      iconElementsArr.forEach((el) => {
        // Add "active" class to selected icon
        if (el === iconEl) {
          el.classList.remove("not-active");

          el.classList.add("active");
        }

        // Remove "active" class from all other icons
        if (el !== iconEl) {
          el.classList.add("not-active");

          el.classList.remove("active");
        }
      });

      // Update state of icon
      // setIcon(iconChange.socialLinkIcon);
      handleLinkInputChange(linkInfo.id, { ...linkInfo, ...iconChange });
    }

    // const linkURL = document.querySelectorAll(".social-links-form__input")[-1];
    // console.log(linkURL);
    // linkURL.focus();
  }

  function handleDeleteLink(e) {
    e.preventDefault();

    const linkIdToDelete = e.target.closest("#linkDiv").dataset.id;

    const updatedLinks = currentLinks.filter(
      (link) => link.id !== linkIdToDelete
    );

    updateLinksForm(updatedLinks);

    handleSocialLinksListChange(updatedLinks);
  }

  return (
    <div
      id="linkDiv"
      data-id={linkInfo.id}
      className="form social-links-form__section"
      onClick={() => handleLinkSelect(linkInfo.id)}
    >
      <label className="social-links-form__label" htmlFor="socialLinkURL">
        URL
      </label>
      <div className="social-links-form__input-row">
        <input
          className="social-links-form__input"
          type="text"
          name="socialLinkURL"
          id="socialLinkURL"
          autoComplete="off"
          value={linkURL}
          autoFocus
          onChange={(e) => handleURLChange(e)}
          // onClick={() => handleLinkSelect(linkInfo.id)}
        />
        <div className="social-links__icons-container">
          <div>
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="social-links__icon"
              data-name="instagram"
              data-id={linkInfo.id}
              onClick={(e) => {
                // handleLinkSelect(linkInfo.id);
                handleIconChange(e);
              }}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="social-links__icon"
              data-name="youtube"
              data-id={linkInfo.id}
              onClick={(e) => {
                // handleLinkSelect(linkInfo.id);

                handleIconChange(e);
              }}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "tiktok"]}
              className="social-links__icon"
              data-name="tiktok"
              data-id={linkInfo.id}
              onClick={(e) => {
                // handleLinkSelect(linkInfo.id);
                handleIconChange(e);
              }}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["far", "envelope"]}
              className="social-links__icon"
              data-name="email"
              data-id={linkInfo.id}
              onClick={(e) => {
                // handleLinkSelect(linkInfo.id);
                handleIconChange(e);
              }}
            />
          </div>
          <div>
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="social-links__icon "
              data-name="twitter"
              data-id={linkInfo.id}
              onClick={(e) => {
                // handleLinkSelect(linkInfo.id);
                handleIconChange(e);
              }}
            />
          </div>
        </div>
      </div>
      <button
        className="social-links-form__row__delete-btn"
        onClick={(e) => handleDeleteLink(e)}
      >
        <FontAwesomeIcon
          className="social-links-form__row__delete-icon"
          icon={(["fa", "regular"], ["fa", "trash-can"])}
        />
      </button>
    </div>
  );
}
