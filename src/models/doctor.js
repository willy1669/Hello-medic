const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { 
        type: String, 
        unique: true
    },
    password: String,
    specialization: String,
    hospitalName: String,
    age: Number,
    location: String,
    consultancyFee: Number,
    littleBiography: String,
    days: Date,
    availableDays: {
        from: Date,
        to: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'   
    },
    appointmentDates: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment' 
    },
    created_On: Date
})

module.exports = mongoose.model('doctor', doctorSchema);