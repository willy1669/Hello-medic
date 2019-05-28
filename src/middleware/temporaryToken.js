let jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config.js');

var id = mongoose.Types.ObjectId();

exports.validateToken =  (req, res, next) => {
    var token  = req.headers["x-access-token"];
    
    if(token == null){
        req.token = GenerateToken({temporaryToken : id});
        console.log("generating token", req.token);
        req.cartTemporaryId = id;
        next();
    }else{
        jwt.verify(token, config.secret, function (err, decoded) {
            var msg = {auth: false, message: 'Failed to authenticate token.'};
            if (err){ res.status(500).send(msg);}
            req.token = token,
            req.cartTemporaryId = decoded.temporaryToken;
            console.log("Validating token", decoded.temporaryToken)
           next()
        });
    } 
}

GenerateToken = (payload) => {
  return  jwt.sign(payload, config.secret);
}

