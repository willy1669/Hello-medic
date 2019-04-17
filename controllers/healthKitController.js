const model = require('../models/healthKit');
const service = require('../services/healthKitService');

exports.addHealthKit = (req, res) => {
    const data = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        admin: req.body.admin,
       // healthkitCount: req.body.healthkitCount
    }
    try {
        return service.addhealthKit(req, res, data);
    }
    catch (exception){
        console.log('Error:'+exception)
    }
}

exports.getHealthKit = function (req, res,){
    try {
        return service.getAllHealthKits(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.getHealthKitById = function (req, res){
    try {
        var id = req.params.id;
        return service.getHealthKitById(req, res, id);
    } catch (exception) {
        console.log("Error : "+exception);
    }
}

