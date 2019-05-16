const repository = require ('../repositories/userRepository');
const model = require('../models/user');
const docModel = require('../models/doctor');
const docRepo = require('../repositories/doctorRepository');

exports.signUp =  (req, res, data) => {
    repository.add(data, function(err, employer){
        if (err) {
            res.json ({err: err, message: 'error, user could not be created'});
        } 
        else {
         res.json ({message: 'user created successfully'});
        }
    });
}


exports.bookAnAppointment = (req, res, doctor, data,) => {
   docModel.findOne(doctor, function(err, doc){
       console.log(doc)
       if (doc !== null) {
           model.create(data, function(err, appointmentData){
               console.log(data)
               if (err) res.json({err: err, message: 'information not created'});
                res.json({message: 'appointment successful'})
           })
       }
    })
}

exports.getAllUsers = function(req, res, options){
    model.find(options, '-__v', function(err, Users){
        if (err) res.json({err:err, message:'error, could not retrieve books'});
        res.json(Users);
    });
}