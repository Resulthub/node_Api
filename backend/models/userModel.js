const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require: [true, 'Please add a name']
        },
        email:{
            type: String,
            require: [true, 'Please add a email'],
            unique: true,
        },
        password:{
            type: String,
            require: [true, 'Please add a password']
        },
        role:{
            type: String,
            require: [true, 'Please add a role']
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)