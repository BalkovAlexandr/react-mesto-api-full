import React from 'react'
import PopupWithForm from './PopupWithForm'
import useFormAndValidation from '../hooks/useForm'

function AppPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onOverlayClose,
  isRender,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace(values)
  }

  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      btnName={isRender ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      isDisabled={!isValid}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
    >
      <input
        id='card-name-input'
        type='text'
        placeholder='Название'
        className='popup__input popup__input_add-card_name'
        name='name'
        minLength='2'
        maxLength='30'
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      <span id='card-name-input-error' className='popup__input-error'>{errors.name || ''}</span>
      <input
        id='card-link-input'
        type='url'
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_add-card_link'
        name='link'
        required
        value={values.link || ''}
        onChange={handleChange} 
      />
      <span id='card-link-input-error' className='popup__input-error'>{errors.link || ''}</span>
    </PopupWithForm>
  )
}

export default AppPlacePopup
