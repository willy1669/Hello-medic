const model = require('../models/admin');
const joi = require('joi');
const doctorService = require('../services/doctorService')
const passwordHash = require('password-hash');
const service = require('../services/adminService.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Define schema for validating admin input
const schema = joi.object().keys({
    firstname: joi.string().alphanum().min(3).max(30).required(),
    lastname: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email(),
    password: joi.string().required()
});

exports.adminSignUp = (req, res) => {
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
    // validating the admin input
    joi.validate({firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password}, schema, function (err) {
        try{
            if (err) {
                res.json({err: err.message});
            } 
            else {
                const hashPassword = passwordHash.generate(data.password);    //encrypt admin password
                data.password = hashPassword;
                console.log(data.password);
                return doctorService.signUp(req, res, data);
            }
        }
        catch (exception) {
            console.log("Error: " +exception);
        }
    })
}

function isValidPassword(user, password){
    return passwordHash.verify(password, user.password);
}

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    model.findById(id, function(err, user) {
        done(err, user);
    });
});

exports.loginUser = function (req, res) {
    passport.authenticate('login', {
    successRedirect: '/users', 
    failureRedirect: '/login'
    });
    try {
        passport.use ('login', new LocalStrategy(
            model.findOne({email: req.body.email}, function (err, user) {
                if (err) {
                    res.json({err: err});
                }
                if (user && isValidPassword(user, req.body.password)) {
                    var token = jwt.sign({email: user.email, id: user._id}, '+secret+', {expiresIn: '12h'});
                    res.json({userId:user._id, email:user.email, username: user.username, token: token, message: 'Login successful.'});
                }
                else {
                     res.json({message: 'Incorrect email or password.'})
                }
            }),
        ));
    }
    catch (exception) {
        console.log(exception);
    }
}
