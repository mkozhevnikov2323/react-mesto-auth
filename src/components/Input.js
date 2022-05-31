import React from 'react';

function Input({ type, name, nameOfClass, minLength, maxLength, placeholder }) {
  return (
    <>
      <input type={ type } name={ name } className={ `popup__input popup__input_data_${nameOfClass}` } minLength={ minLength } maxLength={ maxLength } placeholder={ placeholder } defaultValue="" required />
      <span className="popup__error"></span>
    </>
  )
}

export default Input;
