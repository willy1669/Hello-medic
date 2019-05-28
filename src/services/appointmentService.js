const model = require('../models/appointment');
const docModel = require('../models/doctor')
const userModel = require('../models/user');

// exports.bookAppointment = (req, res, doctor, user, appointmentDate, appointmentTime, data) => {
// 	docModel.findOne({"_id": doctor}).exec((err, doctordata) => {
// 		console.log("doctor", doctordata)
// 		if (err) {
// 			res.json({err: err, message: "baba, u no dey database"})
// 		}
// 		else {
// 			if (doctordata) {
// 				userModel.findOne({"_id": user}).exec((err) => {
// 					if (err) {
// 						res.json({message: 'guy, biko try go sign up' })
// 					}
// 					else {
// 						model.findOne(appointmentDate).exec((err, response) => {
// 							if (err) {
// 								return res.status(402).json(err)
// 							}
// 							else if(response.length > 2){
// 								return res.status(403).json('Doctor already has three appointments this day. Please select a different day.')
// 							}
// 							else {
// 								model.find({"_id": user, 'appointmentDate': appointmentDate}, function(err, response) {
// 									if(err) {
// 										return res.status(402).json(err)
// 									}
// 									else if(response.length > 0){
// 										return res.status(403).json('You already have an appointment scheduled for this day. Please select a different day.')
// 									}
// 									else{
// 										Appointment.find({'appointmentDate': appointmentDate, 'appointmentTime': {$gt: req.body.time-20, $lt: req.body.time+20}}, function(err, response) {
// 											if(err) {
// 												return res.status(402).json(err)
// 											}
// 											else if(response.length > 0){
// 												return res.status(403).json('This appointment time is unavailable. Appointments must be scheduled at least 20 minutes apart. Please choose a different time.')
// 											}
// 											else{
// 												var appointment = new model ();
// 												appointment.data = data;
// 												appointment.appointmentDate = appointmentDate;
// 												appointment.appointmentTime = appointmentTime;
// 												appointment.save( err => {
// 													if(err) {
// 														console.log(err);
// 														return res.status(402).json(err);
// 													}
// 													else{
// 														console.log(appointment);
// 														return res.json(appointment)
// 													}
// 												})
// 											}
// 										})
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


exports.bookAppointment = (req, res, doctor, user, appointmentDate, appointmentTime) => {
	model.findOne(docotr).exec((err, docResult) => {
		if (err) {
			res.json({err: err})
		}
		else {
			if (doctor) {
				model.findOne(appointmentDate).exec((err, result) => {
					if (err) {
						res.json({message: 'could not confirm date'})
					}
					else {
						if (result) {
							
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

// exports.getDoctorsByAppointments = (req, res, doctor) {
// 	model.find({}).exec((err) => {

// 	}).populate(doctors)
// }
