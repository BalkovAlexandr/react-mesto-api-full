const Card = require('../models/card')
const ForbiddenError = require('../errors/ForbiddenError')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards.map((card) => card))
    })
    .catch(next)
}

const createCard = (req, res, next) => {
  const { name, link } = req.body

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`))
      }
      next(err)
    })
}
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка по заданному id отсутствует'))
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав')
      }
      card.remove()
      res.send({ message: 'Карточка удалена' })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id карточки'))
      }
      next(err)
    })
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка по заданному id отсутствует'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id карточки'))
      }
      next(err)
    })
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка по заданному id отсутствует'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id карточки'))
      }
      next(err)
    })
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
