import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./actionitem.css";

function ActionItem({ title, description }) {
  const [actionState, setActionState] = useState("editing"); // editing, saved, archived

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  function saveActionItem() {
    console.log("saved");
    setActionState("saved");
  }

  function cancel() {
    titleInputRef.current.blur();
    descriptionInputRef.current.blur();
    setActionState("saved");
  }

  function archive() {
    setActionState("archived");
  }

  function unarchive() {
    setActionState("saved");
  }

  function handleInputFocus() {
    setActionState("editing");
  }

  return (
    <div className="card">
      {/**Inputs */}
      <div className="input-group">
        <input
          name="title"
          type="text"
          value={title}
          className="title"
          ref={titleInputRef}
          disabled={actionState === "archived"}
          onFocus={handleInputFocus}
        />
        <input
          ref={descriptionInputRef}
          name="description"
          type="text"
          value={description}
          className="description"
          disabled={actionState === "archived"}
          onFocus={handleInputFocus}
        />
      </div>

      {/**Action buttons */}
      <div className="button-group">
        {actionState === "editing" && (
          <>
            <button name="cancel" onClick={cancel}>
              Cancel
            </button>
            <button name="save" onClick={saveActionItem}>
              Save
            </button>
          </>
        )}
        {actionState === "saved" && (
          <>
            <button name="archive" onClick={archive}>
              Archive
            </button>
          </>
        )}
        {actionState === "archived" && (
          <>
            <button name="unarchive" onClick={unarchive}>
              Unarchive
            </button>
          </>
        )}
      </div>
    </div>
  );
}

ActionItem.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ActionItem;
