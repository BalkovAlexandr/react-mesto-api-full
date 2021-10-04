import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onOverlayClose,
  isRender,
}) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      btnName={isRender ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
    >
      <input
        id='change-avatar-input'
        type='url'
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_change-avatar_link'
        name='link'
        required
        ref={avatarRef}
      />
      <span
        id='change-avatar-input-error'
        className='popup__input-error'
      ></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
