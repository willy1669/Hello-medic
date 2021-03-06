const model = require('../models/healthKit');
const service = require('../services/healthKitService');

exports.addHealthKit = (req, res) => {
    const data = {
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        admin: req.body.admin,
        cart: req.body.cart,
        description: req.body.description
    }
    try {
        return service.addhealthKit(req, res, data);
    }
    catch (exception){
        console.log('Error:'+exception)
    }
}

exports.getHealthKit = (req, res,) => {
    try {
        return service.getAllHealthKits(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.getHealthKitById = (req, res) => {
    try {
        var id = req.params.id;
        return service.getHealthKitById(req, res, id);
    } catch (exception) {
        console.log("Error : "+exception);
    }
}

exports.searchHealthKits = (req, res) => {
    try {
        var options = req.query.title;
        return service.searchByTitle(req, res, options);
    } catch (exception){
        console.log("Error : "+exception);
    }
}
