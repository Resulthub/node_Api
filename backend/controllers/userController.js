const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc     GET Users
// @route    GET /api/v1/users
// @access   Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

   res.status(200).json(users)
})

// // @desc     GET Users
// // @route    GET /api/v1/users/:id
// // @access   Private
// const viewUser = asyncHandler(async (req, res) => {
//     // const {_id, name, email, role} = await User.findById(req.params.id)
//     // const users = await User.findById(req.params.id)
//     const {email} = await User.findById(req.params.id)
    
//     console.log(email)

//     res.status(200).json({message: "HEllo user"})
//     //  res.json({message: 'User display data' })
// })

// @desc     GET User
// @route    GET /api/v1/user
// @access   Private

const getMe = asyncHandler(async (req, res) => {
    // res.json({message: 'User display data' })
    const {_id, name, email, role} = await User.findById(req.user.id)
    // const user = await User.find()

    console.log(req.user.id)

    // res.status(200).json({user })
    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    })
})


// @desc     ADD User
// @route    POST /api/v1/users
// @access   Private
const addUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    if(!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }

        //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')    
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: GenerateToken(user._id)
        })
    }else {
      res.status(400)
      throw new Error ('Invalid user data')  
    }
})

// @desc     Update User
// @route    PUT /api/v1/users/:id
// @access   Private
const updateUser = asyncHandler( async (req, res) => {
   const user = await User.findById(req.params.id)


   if(!user) {
       res.status(400) 
       throw new Error('User not found')
   }

   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
       new: true,
   })

//    console.log(updatedUser)

   res.status(200).json(updatedUser)
})

// @desc     Delete Goals
// @route    DeLETE /api/goals/
// @access   Private
const deleteUser = asyncHandler( async (req, res) => {
   const user = await User.findById(req.params.id)

   if(!user) {
       res.status(400) 
       throw new Error('User not found')
   }

   await user.remove()

   res.status(200).json({id: req.params.id})
})

// Generate JWT 
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    } )
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getMe,
//   viewUser
}