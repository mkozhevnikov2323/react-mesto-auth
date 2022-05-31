import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, showLoading}) {

  const editAvatarRef = React.useRef(null);

  React.useEffect(() => {
    editAvatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: editAvatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      btnText={showLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input
          id="avatar-link"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__avatar-link"
          required
          ref={editAvatarRef}/>
        <span
          className="popup__error popup__error_visible avatar-link-error">
        </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
