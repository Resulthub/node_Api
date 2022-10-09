const asyncHandler = require('express-async-handler')

// @desc     GET Goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({  message: 'Get goals' })
})

// @desc     SET Goal
// @route    POST /api/goals
// @access   Private
const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body)

    if(!req.body.text){
        
        // console.log("message")
        res.status(400)
        throw new Error('Please add a text field')
        
    }
    
    res.status(200).json({  message: 'Set  goals' })
})

// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = asyncHandler( async (req, res) => {
    res.status(200).json({  message: `Update goal ${req.params.id }`} )
})

// @desc     Delete Goals
// @route    DeLETE /api/goals/
// @access   Private
const deleteGoal = asyncHandler( async (req, res) => {
    res.status(200).json({  message: `Delete goal ${req.params.id}` })
})

module.exports = {
   getGoals,
   setGoal,
   updateGoal,
   deleteGoal,
}