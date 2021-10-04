/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
const { NODE_ENV, JWT_SECRET } = process.env

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ConflictError = require('../errors/ConflictError')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')

const saltRounds = 10

const deleteEmptyField = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users.map((user) => {
        const {
          name,
          about,
          avatar,
          _id,
        } = user
        return {
          _id,
          name,
          about,
          avatar,
        }
      }))
    })
    .catch(next)
}

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь по заданному id отсутствует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id пользователя'))
      }
      next(err)
    })
}

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body

  if (!password) {
    throw new ValidationError('Введите пароль');
  }
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`))
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'))
      }
      next(err)
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' })
      res.cookie('token', token, { maxAge: 3600000, httpOnly: true })
        .end()
    })
    .catch(next)
}

const updateUserProfile = (req, res, next) => {
  deleteEmptyField(req.body)
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по заданному id отсутствует'))
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`))
      }
      next(err)
    })
}

const updateUserAvatar = (req, res, next) => {
  deleteEmptyField(req.body)
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по заданному id отсутствует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`))
      }
      next(err)
    })
}

const currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send(user))
    .catch(next)
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  updateUserProfile,
  updateUserAvatar,
  currentUser,
}
