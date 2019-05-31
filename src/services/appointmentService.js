const model = require('../models/appointment');
const docModel = require('../models/doctor')
const userModel = require('../models/user');

exports.bookAppointment = (req, res, doctor, user, appointmentDate, appointmentTime) => {
	userModel.findById(user).exec((err, userResult) => {
		if (err) {
			res.json({err: err, messgae: 'user does not exist'})
		}
		else {
			if (userResult) {
				docModel.findById(doctor).exec((err, doctorResult) => {
					if (err) {
						res.json({err: err, message: 'doctor does not exist'})
					}
					else {
						if (doctorResult) {
							console.log("doctorResult", doctorResult.availableDays)
							model.findOne(appointmentDate).exec((err, result) => {
								if (err) {
									res.json({err: err, message: 'failed'})
								}
								else {
									console.log("appointmentResult", result)
									if (appointmentDate.length > 0) {
										return 1
									}
								}
							})
						}
					}
				})
			}
		}
	})	

}

exports.getAllAppointments = (req, res, options) => {
	model.find(options, '-__v', function(err, appointments){
		if (err) res.json({err:err, message:'error, could not retrieve books'});
			res.json(appointments);
	});
}


