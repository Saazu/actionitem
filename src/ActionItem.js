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
  const [actionItemState, setActionItemState] = useState(initialActionItemState); // States are: editing, saved, archived
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [previousValues, setPreviousValues] = useState({ title, description });

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  function saveActionItem() {
    setActionItemState("saved");
    const titleToSave = titleValue.trim();
    const descriptionToSave = descriptionValue.trim();

    setTitleValue(titleToSave);
    setDescriptionValue(descriptionToSave);
    saveActionHandler(id, titleToSave, descriptionToSave);
  }

  function cancel() {
    titleInputRef.current.blur();
    descriptionInputRef.current.blur();
    setActionItemState("saved");
    setTitleValue(previousValues.title);
    setDescriptionValue(previousValues.description);
  }

  function archive() {
    setActionItemState("archived");
    archiveActionHandler(id);
  }

  function unarchive() {
    setActionItemState("saved");
    unArchiveActionHandler(id);
  }

  function handleInputFocus() {
    setActionItemState("editing");
    if (actionItemState !== "editing") {
      setPreviousValues({ title: titleValue, description: descriptionValue });
    }
  }

  function handleTitleChange(event) {
    setTitleValue(event.currentTarget.value);
  }

  function handleDescriptionChange(event) {
    setDescriptionValue(event.currentTarget.value);
  }

  return (
    <div className={actionItemState === "archived" ? "archived-card" : "card"}>
      <div className="input-group">
        <input
          name="title"
          type="text"
          value={titleValue}
          className="title"
          placeholder="Add Title"
          ref={titleInputRef}
          disabled={actionItemState === "archived"}
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
          disabled={actionItemState === "archived"}
          onFocus={handleInputFocus}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="button-group">
        {actionItemState === "editing" && (
          <>
            <button
              name="cancel"
              onClick={cancel}
              disabled={titleValue.trim() === "" && descriptionValue.trim() === ""}
            >
              Cancel
            </button>
            <button
              name="save"
              onClick={saveActionItem}
              disabled={titleValue.trim() === "" || descriptionValue.trim() === ""}
            >
              Save
            </button>
          </>
        )}
        {actionItemState === "saved" && (
          <button name="archive" onClick={archive}>
            Archive
          </button>
        )}
        {actionItemState === "archived" && (
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
