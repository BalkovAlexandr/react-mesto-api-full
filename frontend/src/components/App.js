import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

import Header from './Header.js'
import Main from './Main.js'
import Login from './Login.js'
import Register from './Register'
import InfoTooltip from './InfoTooltip.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AppPlacePopup from './AddPlacePopup.js'
import DeletePlacePopup from './DeletePlacePopup.js'
import api from '../utils/api.js'
import *  as auth from '../utils/auth.js'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({})
  const [renderSave, setRenderSave] = React.useState(false)
  const history = useHistory()

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isInfoTooltip, setIsInfoTooltip] = React.useState({ isOpen: false, successful: false })

  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, element: {} })
  const [cards, setCards] = React.useState([])
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({ isOpen: false, element: {} })

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [loggedIn])

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      handleLoggedIn()
      setEmail(data.email)
      setCurrentUser(data)
      history.push('/')
    })
    .catch(err => {
      console.log(err)
    })
    }, [history, loggedIn])

  // React.useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getInitialCards()])
  //     .then(([userData, cards]) => {
  //       setCurrentUser(userData)
  //       setCards(cards)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     auth
  //       .checkToken(token)
  //       .then(data => {
  //         if (data) {
  //           setEmail(data.data.email)
  //           handleLoggedIn()
  //           history.push('/')
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }, [history])

  React.useEffect(() => {
    const closeByEscape = e => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  })

  function handleLoggedIn() {
    setLoggedIn(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card })
  }

  function handleDeleteCardClick(card) {
    setSelectedCardDelete({ ...selectedCardDelete, isOpen: true, element: card })
  }

  function handleInfoTooltip(result) {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: result })
  }

  function handleUpdateUser(userInfo) {
    setRenderSave(true)
    api.updateUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setRenderSave(false))
  }

  function handleUpdateAvatar(avatar) {
    setRenderSave(true)
    api.setNewAvatar(avatar)
      .then(data => {
        setCurrentUser({...currentUser, avatar: data.avatar})
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setRenderSave(false))
  }

  function handleAddPlaceSubmit(card) {
    setRenderSave(true)
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setRenderSave(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    setRenderSave(true)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => (c._id === card._id ? false : true))
        setCards(newCards)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setRenderSave(false))
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        if (data) {
          handleInfoTooltip(true)
          history.push('/sign-in')
        }
      })
      .catch(err => {
        console.log(err)
        handleInfoTooltip(false)
      })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(res => {
          setEmail(email)
          handleLoggedIn()
          history.push('/')
      })
      .catch(err => {
        handleInfoTooltip(false)
        console.log(err)
      })
  }

  function handleSignOut() {
    auth.logout()
      .then(res => {
        setLoggedIn(false)
        setEmail('')
        history.push('/sign-in')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ ...selectedCard, isOpen: false })
    setSelectedCardDelete({ ...selectedCardDelete, isOpen: false })
    setIsInfoTooltip(false)
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />

          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />

        <InfoTooltip
          result={isInfoTooltip}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <AppPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClose={handleOverlayClose}
          isRender={renderSave}
        />

        <DeletePlacePopup
          deleteCard={selectedCardDelete}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
          onDeleteCard={handleCardDelete}
          isRender={renderSave}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
