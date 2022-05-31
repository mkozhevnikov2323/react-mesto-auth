import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({onClose, isOpen, onUpdateUser, showLoading}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);

  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
        name,
        description: description,
    });
  }

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      btnText={showLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input
          required
          id="name"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          className="popup__input"
          placeholder="Имя"
          value={name || ""}
          onChange={handleNameChange}/>
        <span className="popup__error popup__error_visible name-error" />
        <input
          required
          id="job"
          name="description"
          type="text"
          minLength="2"
          maxLength="200"
          className="popup__input"
          placeholder="Профессия"
          value={description || ""}
          onChange={handleDescriptionChange}/>
        <span className="popup__error popup__error_visible job-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
