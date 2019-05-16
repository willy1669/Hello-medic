const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

module.exports = mongoose.model('admin', adminSchema);