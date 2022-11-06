const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        index: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    img: Array
})

module.exports = mongoose.model('Users', UserSchema)