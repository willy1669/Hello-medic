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
    Age: Number,
    Location: String,
    consultancyFee: Number,
    littleBiography: String,
    reserved: [
        {
            from: String,
            to: String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'   
         },
    time: Date
})

module.exports = mongoose.model('doctor', doctorSchema);