import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id
  console.log(isOwn)
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'
  }`
  const isLiked = card.likes.some(i => i === currentUser._id)
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className='element'>
      <img
        className='element__pic'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type='button'
      ></button>
      <div className='element__desc'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__like-group'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <p className='element__current-likes'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
export default Card
