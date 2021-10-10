import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import useFormWithValidation from '../hooks/useForm'

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onOverlayClose,
  isRender,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar(values.link)
  }

  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      btnName={isRender ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        id='change-avatar-input'
        type='url'
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_change-avatar_link'
        name='link'
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span
        id='change-avatar-input-error'
        className='popup__input-error'
      >{errors.link || ''}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
