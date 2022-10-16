const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add a name']
    },
    user:{
        type: String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Goal', authSchema)