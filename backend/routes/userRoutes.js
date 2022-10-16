const express = require('express')
const router = express.Router()
const {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getMe,
    // viewUser
} = require('../controllers/userController')
const {protect}= require('../middleware/authMiddleware')

router.route('/').post(addUser)
router.get('/', protect, getUsers)
router.get('/me', protect, getMe)
// router.get('/:id', viewUser)
router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router