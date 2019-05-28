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
    appointmentDate:{
		type: Date,
		required: [true, "Date is required."],
		min: new Date(+Date.now() - 7*24*60*60*1000),
	},
    appointmentTime: {
		type: Number,
		required: [true, "Time is required."],
		min: [480, "Too early"],
		max: [1020, "Too late"],
	},
})

module.exports = mongoose.model('appointment', appointmentSchema);