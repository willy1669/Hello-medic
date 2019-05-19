const model = require('../models/appointment');
const service = require('../services/appointmentService');

exports.bookAppointment = (req, res,) => {
    console.log(req.body)
    doctor = req.body.doctor;
    user = req.body.user;
    data = {
        symptoms: req.body.symptoms,
        age: req.body.age,
        gender: req.body.gender
    }
    appointmentDate = req.body.appointmentDate;
    appointmentStartTime = req.body.appointmentStartTime
    try {
        return service.bookAppointment(req, res, doctor, user, data, appointmentDate, appointmentStartTime)
    }
    catch (exception) {
        console.log('Error' +exception);
    }
}