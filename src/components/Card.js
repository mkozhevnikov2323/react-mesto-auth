import React from 'react';
import trash from '../images/Trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onDeleteButton }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id === currentUser._id);
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onDeleteButton(card);
  }

  return (
    <li className="element">
      <div className="element__rectangle">
        <img
          src={trash}
          alt="Иконка удаления"
          className={`element__trash ${
            isOwn ? "element__trash_visible" : "element__trash_hidden"
          }`}
          onClick={handleDeleteCard}
        />
        <img
          src={card.link}
          alt={card.name}
          className="element__photo"
          onClick={handleClick}
        />
        <p className="element__place">{card.name}</p>
        <button
          type="button"
          className={`element__heart ${isLiked ? "element__heart_active" : ""}`}
          onClick={handleLikeClick}
        ></button>
        <div className="element__heart-counter">{card.likes.length}</div>
      </div>
    </li>
  );
}

export default Card;
