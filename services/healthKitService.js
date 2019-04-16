const model = require('../models/healthKit');
const repository = require('../repositories/cartRepository')

exports.addhealthKit =  (req, res, data) => {
    repository.add(data, function(err, healthKit){
        if (err) {
            res.json ({err: err, message: 'Error, Product could not be created'});
        } 
        else {
         res.json ({message: ' Product created successfully'});
        }
    });
}

exports.getAllHealthKits = function(req, res, options){
    repository.getAll(options, '-__v', function(err, healthKits){
        if (err) res.json({err:err, message:'error, could not retrieve healthKit'});
        res.json(healthKits);
    });
}