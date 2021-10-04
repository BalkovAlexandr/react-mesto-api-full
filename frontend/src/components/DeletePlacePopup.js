import React from 'react'
import PopupWithForm from './PopupWithForm'

function DeletePlacePopup({
  deleteCard: { isOpen, element },
  onClose,
  onOverlayClose,
  onDeleteCard,
  isRender,
}) {
  function handleSubmit(e) {
    e.preventDefault()
    onDeleteCard(element)
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      btnName={isRender ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  )
}

export default DeletePlacePopup
