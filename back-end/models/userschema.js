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
    phone: {
        type: Number,
        required: true,
    },
    savedPosts: Array,
    imgPath: {
        type: String,
        index: true,
    }
})

module.exports = mongoose.model('Users', UserSchema)