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
        index: true,
        minlength: 5
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    img: Array   //change this later: take only one image
})

module.exports = mongoose.model('Users', UserSchema)