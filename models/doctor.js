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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'   
         },
    appointmentDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment' 
    }
})

module.exports = mongoose.model('doctor', doctorSchema);