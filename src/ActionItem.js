import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./actionitem.css";

function ActionItem({
  id,
  title,
  description,
  saveActionHandler,
  archiveActionHandler,
  unArchiveActionHandler,
}) {
  const initialActionItemState = title !== "" ? "saved" : "editing";
  const [actionState, setActionState] = useState(initialActionItemState); // States are: editing, saved, archived
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [previousValues, setPreviousValues] = useState({ title, description });

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  function saveActionItem() {
    setActionState("saved");
    saveActionHandler(id, titleValue, descriptionValue);
  }

  function cancel() {
    titleInputRef.current.blur();
    descriptionInputRef.current.blur();
    setActionState("saved");
    setTitleValue(previousValues.title);
    setDescriptionValue(previousValues.description);
  }

  function archive() {
    setActionState("archived");
    archiveActionHandler(id);
  }

  function unarchive() {
    setActionState("saved");
    unArchiveActionHandler(id);
  }

  function handleInputFocus() {
    setActionState("editing");
    setPreviousValues({ title, description });
  }

  function handleTitleChange(event) {
    setTitleValue(event.currentTarget.value);
  }

  function handleDescriptionChange(event) {
    setDescriptionValue(event.currentTarget.value);
  }

  return (
    <div className="card">
      {/**Inputs */}
      <div className="input-group">
        <input
          name="title"
          type="text"
          value={titleValue}
          className="title"
          placeholder="Add Title"
          ref={titleInputRef}
          disabled={actionState === "archived"}
          onFocus={handleInputFocus}
          onChange={handleTitleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Add Description"
          ref={descriptionInputRef}
          value={descriptionValue}
          className="description"
          disabled={actionState === "archived"}
          onFocus={handleInputFocus}
          onChange={handleDescriptionChange}
        />
      </div>

      {/**Action buttons */}
      <div className="button-group">
        {actionState === "editing" && (
          <>
            <button
              name="cancel"
              onClick={cancel}
              disabled={titleValue === "" && descriptionValue === ""}
            >
              Cancel
            </button>
            <button
              name="save"
              onClick={saveActionItem}
              disabled={titleValue === "" || descriptionValue === ""}
            >
              Save
            </button>
          </>
        )}
        {actionState === "saved" && (
          <button name="archive" onClick={archive}>
            Archive
          </button>
        )}
        {actionState === "archived" && (
          <button name="unarchive" onClick={unarchive}>
            Unarchive
          </button>
        )}
      </div>
    </div>
  );
}

ActionItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  saveActionHandler: PropTypes.func.isRequired,
  archiveActionHandler: PropTypes.func.isRequired,
  unArchiveActionHandler: PropTypes.func.isRequired,
};

export default ActionItem;
