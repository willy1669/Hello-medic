const model = require('../models/healthKit');
const repository = require('../repositories/healthKitRepository')

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
    repository.getAll(options, '-__v', function(err, HealthKit){
        if (err) res.json({err:err, message:'error, could not retrieve healthKit'});
        res.json(HealthKit);
    });
}

exports.getHealthKitById = function (req, res, id){
    repository.getById(id, function (err, kit){
        if (err) res.json ({err: err, message: 'error, could not get kit by id'});
        res.json ({Kit: kit});
    });
}

exports.searchByTitle = function(req, res, title){
    model.find({title: { $regex: title, $options: 'gi' }}, function(err, healthKits){
        if (err){
            res.json({err: err, message: 'error, search failed'});
        } else {
            res.json(healthKits);
        }
    })
}
