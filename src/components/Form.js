import React from "react";

function Form({ name, children, submitName, onSubmit }) {
  return (
    <form className="popup__form" name={name} onSubmit={onSubmit}>
      {/* <h2 className="popup__title">{title}</h2> */}
      {children}
      <button type="submit" className="popup__save-btn">
        {submitName}
      </button>
    </form>
  );
}

export default Form;
