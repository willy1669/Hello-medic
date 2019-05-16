const model = require('../models/products');
const service = require('../services/productsService')

exports.getAllProducts = (req, res) => {
    try {
        return service.getAllProducts(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}

exports.createProduct = (req, res) => {
    const data = {
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        categories: req.body.categories
    }
    try {
            return service.createProduct(req, res, data)
    }
    catch (exception) {
            console.log("Error:" +exception)
    }
}

exports.getProductsById = (req, res) => {
    try {
        var id = req.params.id;
        return service.getProductsById(req, res, id);
    } catch (exception) {
        console.log("Error : "+exception);
    }
}

