const model = require('../models/category');
const service = require('../services/categoryService')

exports.createCategory = (req, res) => {
    data = {
        name : req.body.name
    }
    
    try {
        return service.createCategory(req, res, data)
    }
    catch (exception) {
        console.log("Error:" +exception)
    }
}

exports.getAllCategories = (req, res) => {
    try {
        return service.getAllCategories(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.getACategoryById = (req, res) => {
    var id = req.params.id;
    try {
        return service.getACategoryById(req, res, id)
    }
    catch (exception) {
        console.error("Error : " +exception)
    }
}