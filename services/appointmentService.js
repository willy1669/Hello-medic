//const repository = require('../repository/appointmentRepository');
const model = require('../models/appointment');
const docModel = require('../models/doctor')
const userModel = require('../models/user');

// exports.bookAppointment = (req, res, doctor, appointmentDate, appointmentStartTime, appointmentEndTime, user) => {
// 	docModel.findOne({"_id": doctor}).exec((err, doctorData) => {
// 		console.log("doctorData", doctorData)
// 		if (err) {
// 			res.json({err: err, message: "baba, u no dey database"})
// 		}
// 		else {
// 			if (doctorData) {
// 				userModel.findOne({"userId": user}).exec((err, result) => {
// 					console.log("response", user)
// 					if (err) {
// 						res.json({err: err})
// 					}
// 					else if (result) {
// 						res.json({message:'You already have an appointment scheduled for this day. Please select a different day.'})
// 					}
// 					else {
// 						model.find({"userId": user}, function(err, result) {
// 							if(err) {
// 								return res.status(402).json(err)
// 							}
// 							else if(result > 0){
// 								return res.status(403).json('This appointment time is unavailable. Appointments must be scheduled at least 20 minutes apart. Please choose a different time.')
// 							}
// 							else{
// 								let appointment = new model(req.body);
// 								appointment.data = data;
// 								appointment.appointmentDate = appointmentDate;
// 								appointment.appointmentStartTime = appointmentStartTime;
// 								// appointmnet.appointmentEndTime = appointmentEndTime;
// 								appointment.save( err => {
// 									if(err) {
// 										console.log(err);
// 										return res.status(402).json(err);
// 									}
// 									else{
// 										console.log(appointment);
// 										return res.json(appointment)
// 									}
// 								})
// 							}

// 						})
// 					}
// 				})
// 			}
// 		}
// 	})
// }

exports.bookAppointment = (req, res, doctor, user, appointmentDate, data) => {
	docModel.findOne({"_id": doctor}).exec((err, doctordata) => {
		console.log("doctor", doctordata)
		if (err) {
			res.json({err: err, message: "baba, u no dey database"})
		}
		else {
			if (doctordata) {
				userModel.findOne({"_id": user}).exec((err) => {
					if (err) {
						res.json({message: 'guy, biko try go sign up' })
					}
					else {
						model.findOne(appointmentDate).exec((err, result) => {
							if 
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

// exports.getDoctorsByAppointments = (req, res, doctor) {
// 	model.find({}).exec((err) => {

// 	}).populate(doctors)
// }
