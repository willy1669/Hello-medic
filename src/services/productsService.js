const model = require('../models/products');
const repository = require('../repositories/productsRepository');
const Kart = require('../models/cart');
const categoryModel = require('../models/category')

exports.createProduct =  (req, res, data) => {
    repository.add(data, (err, result) => {
        if (err) {
            res.json ({err: err, message: 'Error, Product could not be created'});
        } 
        else {
            if (result.category !== null) {
                categoryModel.findById(result.category).exec((err, data) => {
                    if (data) {
                        data.products.push(result);
                        data.save()
                        res.json({data: result, message: 'product created successfully'})
                    }
                })
            }
        }
    })
}

exports.getAllProducts = function(req, res, options){
    model.find(options, '-__v', function(err, products){
        if (err) res.json({err:err, message:'error, could not retrieve products'});
        res.json(products);
    }).populate({path: 'categories', select: 'name'})
}

exports.getProductsById = function (req, res, id){
    repository.getById(id, function (err, product){
        if (err) res.json ({err: err, message: 'error, could not get kit by id'});
        res.json ({product: product});
    });
}

exports.deleteProduct = (req, res, option) => {
    model.findByIdAndDelete({"_id": option}).exec((err) => {
        if (err) {
            res.json({message: "product id could not be found"})
        }
        else {
            res.json({message: "product deleted successfully"})
        }
    })
}