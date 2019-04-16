const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'cart'
    },
    symptoms: String,
    Gender: String,
    age: Number
})

module.exports = mongoose.model('user', userSchema);