import React from "react";
import Form from "./Form";

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
        <Form
          name={name}
          children={children}
          submitName={btnText}
          onSubmit={onSubmit}
        />
        <button className="popup__close-icon" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
