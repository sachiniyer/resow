const mongoose = require('mongoose')

function getCoord(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
}
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    latitude: {
        type: mongoose.Decimal128,
        default: 0,
        get: getCoord,
        required: true
    },
    longitude: {
        type: mongoose.Decimal128,
        default: 0,
        get: getCoord,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    images: Array
})

module.exports = mongoose.model('Posts', PostSchema)
