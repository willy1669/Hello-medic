const repository = require('../repositories/firstAidRepository');
const model = require('../models/firstAid');
const products = require('../models/products')

exports.createFirstAid =  (req, res, data, products) => {
    repository.add(data, (err) => {
        if (err) {
            res.json ({err: err, message: 'Error, Product could not be created'});
        } 
        else {
         res.json ({message: 'firstAid created successfully'});
        }
    }).populate(products);
    console.log(data.products)
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

exports.getAllFirstAid= function(req, res, options) {
    model.find(options, '-__v', function(err, firstAid) {
        if (err) res.json({err:err, message:'error, could not retrieve healthKit'});
        res.json(firstAid);
    });
}