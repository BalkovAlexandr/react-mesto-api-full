const router = require('express').Router()
const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  currentUser,
} = require('../controllers/users')

const { validateUser, validateUserProfile, validateUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers)

router.get('/:userId', validateUser, getUser)

router.get('/me', currentUser);

router.patch('/me', validateUserProfile, updateUserProfile)

router.patch('/me/avatar', validateUserAvatar, updateUserAvatar)

module.exports = router
