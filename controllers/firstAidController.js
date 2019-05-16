const model = require('../models/firstAid');
const service = require('../services/firstAidService')


exports.createFirstAid = (req, res) => {
    const data = {
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
    }
    
    try {
        return service.createFirstAid(req, res, data)
    }
    catch (exception) {
        console.log("Error:" +exception)
    }
}
exports.searchFirstAid = (req, res) => {
    try {
        var options = req.query.title;
        return service.searchByTitle(req, res, options);
    } catch (exception){
        console.log("Error : "+exception);
    }
}

exports.getAllFirstAid = (req, res) => {
    try {
        return service.getAllFirstAid(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}