const repository = require ('../repositories/userRepository');
const model = require('../models/user');
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


// exports.bookAnAppointment = (req, res, data) => {
//     repository.add(data, function(err, booking) {
//         docRepo.getById(data.doctor, function(err, doctor) {
//             console.log(data.doctor)
//             console.log(booking._id)
//             if (err) res.json({ err: err, message: 'appointment could not be approved'})
//             res.json({message: 'appointment approved'})
//         })
//     })
// }