import React from 'react'
import trueImage from '../images/true.png'
import falseImage from '../images/false.png'

function InfoTooltip({
  onClose,
  onOverlayClose,
  result: { isOpen, successful },
}) {
  return (
    <section
      className={`popup popup_type_info ${isOpen ? 'popup_opened' : false}`}
      onClick={onOverlayClose}
    >
      <div className='popup__container popup__container_type_info'>
        <img
          className='popup__photo popup__photo_type_info'
          src={successful ? trueImage : falseImage}
          alt='результат'
        />
        <h2 className={`popup__title popup__title_type_info`}>
          {successful
            ? 'Вы успешно зарегестрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
        <button onClick={onClose} className='popup__close' type='button' />
      </div>
    </section>
  )
}

export default InfoTooltip
