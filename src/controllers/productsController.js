const model = require('../models/products');
const service = require('../services/productsService');
var cloud = require('../cloudinary')

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
        category: req.body.category,
        productImage: req.files.path,
        prdouctImageID: '',
    }
    try {
        cloud.uploadToCloud(data.productImage).then((result)=>{
            data.productImage = result.url;
            data.productImageImageID = result.ID;
            return service.createProduct(req, res, data);
        });
    }
    catch (exception) {
        console.log("Error while adding product ->" +exception)
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

exports.deleteProduct = (req, res) => {
    var option = req.params.option;
    try {
        return service.deleteProduct(req, res, option)
    }
    catch (exception) {
        console.log("Error: "+exception)
    }
}
