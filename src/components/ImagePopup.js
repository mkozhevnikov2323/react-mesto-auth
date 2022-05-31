import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={ `popup popup_action_show-place ${card.link && 'popup_opened'}` }>
      <div className="popup__photo-container">
        <img src={ card.link } alt={ card.name } className="popup__photo" />
        <h2 className="popup__photo-title">{ card.name }</h2>
        <button className="popup__close-icon" onClick={ onClose }></button>
      </div>
    </div>
  )
}

export default ImagePopup;
