const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    specialty: String,
    hospitalName: String,
    Age: Number,
    Location: String,
    time: Date
})

module.exports = mongoose.model('doctor', doctorSchema);