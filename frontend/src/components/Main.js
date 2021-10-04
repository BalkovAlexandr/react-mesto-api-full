import React from 'react'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className='container'>
      <section className='profile page__center'>
        <div className='profile__content'>
          <div className='profile__pic'>
            <img
              src={currentUser.avatar}
              alt='аватар'
              className='profile__avatar'
            />
            <button
              className='profile__change-btn'
              type='button'
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className='profile__info'>
            <div className='profile__row'>
              <h1 className='profile__title'>{currentUser.name}</h1>
              <button
                className='profile__edit-btn'
                type='button'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>
        <button
          className='profile__add-btn'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='elements page__center'>
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
