const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    data : {
    symptoms: String,
    gender: String,
    age: Number,
    },
    appointmentDate: Date,
    appointmentStartTime: Date,
    appointmentEndTime: Date
})

module.exports = mongoose.model('appointment', appointmentSchema);