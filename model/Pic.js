const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PicSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    tag: {
        type: Array
    },
    isShown: {
        type: Boolean,
        default: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('pic', PicSchema)