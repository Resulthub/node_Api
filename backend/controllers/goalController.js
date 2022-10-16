const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')


// @desc    Goal new user
// @route   POST /api/v1/goals
// @access  Private
const addGoal = asyncHandler(async (req, res) => {
    const { text } = req.body

    if(!text) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const goal = await Goal.create({
        text,
        user: req.user.id
    })

    if(goal){
        res.status(201).json({message: "New Goal Added"  })
    }else {
      res.status(400)
      throw new Error ('Invalid Goa data')  
    }
})

// @desc     GET Goals
// @route    GET /api/v1/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({"user": req.user.id})


   res.status(200).json(goals)
})

// @desc     Update Goal
// @route    PUT /api/v1/goals/:id
// @access   Private
const updateGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)
 
 
    if(!goal) {
        res.status(400) 
        throw new Error('Goal not found')
    }
 
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
  
    res.status(200).json(updatedGoal)
 })

// @desc     Delete Goals
// @route    DeLETE /api/v1/goals/:id
// @access   Private
const deleteGoal = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)
 
    if(!goal) {
        res.status(400) 
        throw new Error('Goal not found')
    }
 
    await goal.remove()
 
    res.status(200).json({id: req.params.id, message: "Goal Deleted"})
 })
 
// @desc    Get user data
// @route   GET /api/v1/goals/:id
// @access  Private
const viewGoal = asyncHandler(async (req, res) => {
    // const goals = await Goal.findById(req.params.id)
    const {text} = await Goal.findById(req.params.id)

    // console.log(text)

    res.status(200).json(text)
    // res.json({message: req.params.id })
})

module.exports = {
    addGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    viewGoal
}