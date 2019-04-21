const repository = require ('../repositories/doctorRepository');
const model = require('../models/doctor');
const userModel = require('../models/user');
// var mailer = require('../mailer');
// //var cloud = require('../Services/cloudinaryService');


exports.signUp =  (req, res, data) => {
    repository.add(data, function(err, employer){
        if (err) {
            res.json ({err: err, message: 'error, user could not be created'});
        } 
        else {
        var body = 'Thank you for joining us! You will soon be receiving newsletters and updates crafted by the Univelcityreelanceportal team to speed up your experience. We are committed to helping you get the best out of our platform. Welcome to our platform'
        // mailer.sendMail(employer.email, 'Welcome to Univelcity Freelance Portal', employer.employerName, body,);
         res.json ({message: 'user created successfully'});
        }
    });
}

exports.getAllDoctors = function(req, res, options){
    repository.getAll(options, '-__v', function(err, Doctors){
        if (err) res.json({err:err, message:'error, could not retrieve books'});
        res.json(Doctors);
    });
}
// exports.addProfile = (req, res data) => {
//     repository.add(data, function( err, doctor){
//         repository.getById(data.doctor, function(err, data){
            
//         })
//     })
// }

exports.getDoctorById = (req, res, id) => {
    repository.getById(id, function (err, employer){
        if (err) res.json ({err: err, message: 'error, could not get employer by id'});
        res.json (employer);
    });
}

exports.bookAnAppointment = (req, res, data) => {
    repository.getById(data, function (err, user) {
        
    } )
}
