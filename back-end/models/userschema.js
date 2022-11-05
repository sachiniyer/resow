const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Date,
        required: true,
        default: Date.now()
    },
    profilepic: Array
})

module.exports = mongoose.model('Users', UserSchema)