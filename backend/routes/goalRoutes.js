const express = require('express')
const router = express.Router()
const {
    addGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    viewGoal
} = require('../controllers/goalController')
const {protect}= require('../middleware/authMiddleware')

router.post('/', protect, addGoal)
router.get('/', protect, getGoals)
router.get('/:id', protect, viewGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router