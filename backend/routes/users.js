const router = require('express').Router()
const {
  getUsers,
  currentUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,

} = require('../controllers/users')

const { validateUser, validateUserProfile, validateUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers)

router.get('/me', currentUser)

router.get('/:userId', validateUser, getUser)

router.patch('/me', validateUserProfile, updateUserProfile)

router.patch('/me/avatar', validateUserAvatar, updateUserAvatar)

module.exports = router
