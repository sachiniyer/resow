const mongoose = require('mongoose')

const SavePostSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SavePosts', SavePostSchema)