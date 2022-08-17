const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },

    password: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User