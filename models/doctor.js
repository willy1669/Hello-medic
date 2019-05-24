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
    availableDays: {
        type: Date,
        from: Date.parse(),
        To: Date.parse()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'   
    },
    appointmentDates: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment' 
    }
})

module.exports = mongoose.model('doctor', doctorSchema);