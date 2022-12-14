const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Auth = require('../models/authModel')


// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await Auth.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')    
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Auth.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: GenerateToken(user._id)
        })
    }else {
      res.status(400)
      throw new Error ('Invalid user data')  
    }
})

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await Auth.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: GenerateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ('Invalid credentials')  
    }

})

// @desc    Get user data
// @route   POST /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'User display data' })
})

// Generate JWT 
const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    } )
}

module.exports = {
    registerUser,
    loginUser,
    getMe

}