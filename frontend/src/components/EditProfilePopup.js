import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onOverlayClose,
  isRender,
}) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      btnName={isRender ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
    >
      <input
        id='name-input'
        type='text'
        placeholder='Имя'
        className='popup__input popup__input_text_name'
        name='name'
        minLength='2'
        maxLength='40'
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id='name-input-error' className='popup__input-error'></span>
      <input
        id='job-input'
        type='text'
        placeholder='О себе'
        className='popup__input popup__input_text_job'
        name='about'
        minLength='2'
        maxLength='200'
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span id='job-input-error' className='popup__input-error'></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
