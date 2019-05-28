const model = require('../models/user');
const joi = require('joi');
const passwordHash = require('password-hash');
const service = require('../services/userService');
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

exports.userSignUp = (req, res) => {
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
    // validating the user input
    joi.validate({firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password}, schema, function (err) {
        try{
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
            model.findOne({email: req.body.email}, (err, user, done) => {
                if (err) {
                    res.json({err: err});
                }
                if (user && isValidPassword(user, req.body.password)) {
                    var token = jwt.sign({email: user.email, id: user._id, temporaryToken: req.cartTemporaryId}, config.secret, {expiresIn: '12h'});
                    console.log("token", jwt.decode(token, config.secret))
                    res.json({userId:user._id, email:user.email, username: user.username, token: token, message: 'Login successful.'});
                    return done(null, user)
                }
                else {
                    res.json({message: 'Incorrect email or password.'})
                    //console.log(isValidPassword (req.body.password))
            }
                    console.log(user);
                })
        ), function(err, done) {
            if (err) return done(null, false)
            if (user) return done(null, user)
        })
        
    }
    catch (exception) {
        console.log("Error : "+exception);
    }
}

exports.getAllUsers = (req, res) => {
    try {
        return service.getAllUsers(req, res, {});
    } 
    catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.logOutUser = (req, res) => {
    option = req.logout();
    try {
        return option
    }
    catch (exception) {
        console.log("Error : "+exception)
    }

}