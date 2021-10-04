function ImagePopup({ card, onClose, onOverlayClose }) {
  return (
    <section
      className={`popup popup_type_image ${
        card.isOpen ? 'popup_opened' : false
      }`}
      onClick={onOverlayClose}
    >
      <div className='popup__container popup__container_type_image'>
        <img
          className='popup__photo'
          src={card.element.link}
          alt={card.element.name}
        />
        <h2 className='popup__photo-title'>{card.element.name}</h2>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </section>
  )
}

export default ImagePopup
