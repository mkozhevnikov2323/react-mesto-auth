import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, showLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      btnText={showLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="nameOfImage"
        name="name"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error_visible nameOfImage-error" />
      <input
        id="linkOfImage"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span
        id="spanOfImage"
        className="popup__error popup__error_visible linkOfImage-error"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
