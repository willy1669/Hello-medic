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
    model.findByIdAndUpdate(id, profile, function(err, docId) {
        if (err) {
            res.json ({err: err, message: "user id not found"})
        } 
        else {
                res.json({message: 'profile updated', profile: docId})
        }
    }).populate('doctor')
}

