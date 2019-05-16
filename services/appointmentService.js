const repository = require('../repository/appointmentRepository');
const model = require('../models/appointment');
const docModel = require('../models/doctor')
const user = require('../models/user');

exports.bookAppointment = (req, res, doctor, appointmentDate, appointmentStartTime, appointmentEndTime, user) => {
	docModel.findOne(doctor).exec((err, doctorData) => {
		if (err) {
			res.json({err: err, message: "baba, u no dey database"})
		}
		else {
			if (doctorData) {
				model.find({'_userID': req.body._userID, 'date': req.body.date}).exec((err, response) => {
					if (err) {
						res.json({err: err})
					}
					else if (response.length > 0) {
						res.json({message:'You already have an appointment scheduled for this day. Please select a different day.'})
					}
					else {
						model.find({'date': req.body.date, 'time': {$gt: req.body.time-20, $lt: req.body.time+20}}, function(err, response) {
							if(err) {
								return res.status(402).json(err)
							}
							else if(response.length > 0){
								return res.status(403).json('This appointment time is unavailable. Appointments must be scheduled at least 20 minutes apart. Please choose a different time.')
							}
							else{
								let appointment = new model(req.body);
								appointment.data = data;
								appointment.appointmentDate = appointmentDate;
								appointment.appointmentStartTime = appointmentStartTime;
								appointmnet.appointmentEndTime = appointmentEndTime;
								appointment.save( err => {
									if(err) {
										console.log(err);
										return res.status(402).json(err);
									}
									else{
										console.log(appointment);
										return res.json(appointment)
									}
								})
							}

						})
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

exports.getDoctorsByAppointments = (req, res, doctor) {
	model.find({}).exec((err) => {

	}).populate(doctors)
}
