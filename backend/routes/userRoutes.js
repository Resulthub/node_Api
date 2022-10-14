const express = require('express')
const router = express.Router()
const {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getMe
} = require('../controllers/userController')
const {protect}= require('../middleware/authMiddleware')

router.route('/').get(getUsers).post(addUser)
// router.route('/me').get(getMe)
router.get('/me', protect, getMe)
router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router