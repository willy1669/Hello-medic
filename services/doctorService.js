const repository = require ('../repositories/doctorRepository');
const model = require('../models/doctor');
const userModel = require('../models/user');

exports.signUp =  (req, res, data) => {
    repository.add(data, function(err, doctor){
        if (err) {
            res.json ({err: err, message: 'error, doctor could not be created'});
        } else {
            res.json ({message: 'doctor created successfully', result: doctor});
        }
    });
}

exports.getAllDoctors = (req, res, options) => {
    model.find(options, '-__v', function(err, Doctors){
        if (err) res.json({err:err, message:'error, could not retrieve books'});
        res.json(Doctors);
    });
}

exports.getDoctorById = (req, res, id) => {
    repository.getById(id, function (err, employer){
        if (err) res.json ({err: err, message: 'error, could not get employer by id'});
        res.json (employer);
    });
}

exports.searchByTitle = (req, res, specialization) => {
    model.find({title: { $regex: specialization, $options: 'gi' }}, function(err, doctors){
        if (err){
            res.json({err: err, message: 'error, search failed'});
        } else {
            res.json(doctors);
        }
    })
}

exports.createProfile = (req, res, id, profile) => {
    repository.getById(id, function(err, docId) {
        if (err) res.json ({err: err, message: "user id not found"})
        console.log(docId)
        if (docId != null) {
            model.create(profile, function(err, newProfile) {
                if (err) res.json({err: err, message: "profile could not be created"})
                console.log(profile)
                res.json(profile)
            })
        }

    })
}

// exports.getDoctorsByAppointment = (req, res, doctor, appointment) => {
//     repository.getById().exec((err, doc) => {
//         if (err) {
//             res.json({err: err})
//         }
//     }).populuate(appointment)
// }

exports.doctorProfile = (req, res, id) => {
    model.findOne(id).populate()
}