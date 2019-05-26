const model = require('../models/doctor');
const joi = require('joi');
const passwordHash = require('password-hash');
const service = require('../services/doctorService');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config.js')

//Define schema for validating user input
const schema = joi.object().keys({
    firstname: joi.string().alphanum().min(3).max(30).required(),
    lastname: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email(),
    password: joi.string().required()
});

exports.doctorSignUp = (req, res) => {
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        created_On : Date.now()
    }
    // validating the doctor input
    joi.validate({firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password}, schema, function (err) {
        try {
            if (err) {
                res.json({err: err.message});
            } 
            else {
                const hashPassword = passwordHash.generate(data.password);    //encrypt user password
                data.password = hashPassword;
                console.log(data.password);
                return service.signUp(req, res, data);
            }
        }
        catch (exception) {
            console.log("Error: " +exception);
        }
    })
}

function isValidPassword(doctor, password){
    return passwordHash.verify(password, doctor.password);
}

passport.serializeUser(function(doctor, done){
    done(null, doctor.id)
});

passport.deserializeUser(function(id, done) {
    model.findById(id, function(err, doctor) {
        done(err, doctor);
    });
});

exports.loginUser = function (req, res) {
    passport.authenticate('login', {
    successRedirect: '/users', 
    failureRedirect: '/login'
    });
    try {
        passport.use ('login', new LocalStrategy(
            model.findOne({email: req.body.email}, function (err, doctor) {
                if (err) {
                    res.json({err: err});
                }
                if (doctor && isValidPassword(doctor, req.body.password)) {
                    var token = jwt.sign({email: doctor.email, id: doctor._id, temporaryToken: req.cartTemporaryId}, config.secret, {expiresIn: '12h'});
                    console.log("token", jwt.decode(token, config.secret))
                    res.json({docotrId: doctor._id, email:doctor.email, token: token, message: 'Login successful.'});
                }
                else {
                    res.json({message: 'Incorrect email or password.'});
                }
            }), 
            function (err) {
                if (err) {
                    res.json({err:err, message: "create an account"})
                }
                if (doctor == null) {
                    var data = new model();
                    data.firstname = firstname;
                    data.lastname = lastname;
                    data.email = email;
                    data.password = password
                }
            }
        ));
    }
    catch (exception) {
        console.log(exception);
    }
}

exports.getDoctorById = (req, res) => {
    var id = req.body.id;
    try {
        return service.getDoctorById(req, res, id);
    } catch (exception) {
        console.log("Error : "+exception);
    }
}

exports.getDoctors = function (req, res,){
    try {
        return service.getAllDoctors(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.createProfile = (req, res) => {
    var id = req.body.id;
    var profile = {
        specialization : req.body.specialization,
        hospitalName : req.body.hospitalName,
        littleBiography : req.body.littleBiography,
        location : req.body.location, 
        consultancyFee : req.body.consultancyFee,
        availableDays: Date
    }
    try {
        return service.createProfile(req, res, id, profile)
    }    
    catch(exception) {
        console.log("Error: "+exception)
    }
}

exports.searchDoctors = (req, res) => {
    var options = req.body.specialization
    try {
        return service.searchBySpecialization(req, res, options)
    }
    catch(exception) {
        console.log("Error: " +exception)
    }
}







































