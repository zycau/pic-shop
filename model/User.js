const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },    
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: Array,
        required: true,
        default: []
    },
    inCart: {
        type: Array,
        required: true,
        default: []
    },
    haveBought: {
        type: Array,
        required: true,
        default: []
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    registerDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', UserSchema)