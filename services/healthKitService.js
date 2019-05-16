const model = require('../models/healthKit');
const repository = require('../repositories/healthKitRepository');
const Kart = require('../models/cart');

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
    model.find(options, '-__v', function(err, HealthKit){
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

// exports.addHealthKitToCart = (req, res, healthKitId, cart, newCart) => {
//     repository.getById(healthKitId, function(err, healthKit) {
//         if (err) res.json({err: err, message: 'healthKitId could not be retrieved'});
//         console.log(healthKit)
//     })
//     Kart.create(cart, function(err, basket) {
//         console.log(basket)
//         if (!basket) {
//             basket =  basket[healthKitId] = {healthKit: healthKit, quantity: quantity, price: price}
//         }
//         newCart.push(healthKit)
//     })
// }