const model = require('../models/appointment');
const service = require('../services/appointmentService');

exports.bookAppointment = (req, res,) => {
    doctor = req.body.doctor;
    user = req.body.user;
    data = {
        symptoms: req.body.symptoms,
        age: req.body.age,
        gender: req.body.gender
    }
    appointmentDate = req.body.Date.prototype.getDate();
    appointmentStartTime = req.body.Date.prototype.getTime()
    try {
        return service.bookAppointment(req, res, doctor, user, data, startDate, appointmentStartTime)
    }
    catch (exception) {
        console.log('Error' +exception);
    }
}