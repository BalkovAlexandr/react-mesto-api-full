import React from 'react'

function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  btnName,
  onClose,
  onSubmit,
  onOverlayClose,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : false}`}
      onClick={onOverlayClose}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <h3 className='popup__title'>{title}</h3>
        <form
          className='popup__form'
          name={`popup-form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__submit-btn popup__submit-btn_type_${name}`}
            type='submit'
          >
            {btnName}
          </button>
        </form>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </section>
  )
}

export default PopupWithForm
