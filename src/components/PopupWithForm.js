import React from "react";

function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  btnText,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_action_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save-btn">
            {btnText}
          </button>
        </form>
        <button className="popup__close-icon" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
