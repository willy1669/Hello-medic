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
            if (result.categories.length > 0) {
                result.categories.forEach(element => {
                    categoryModel.findOne(element, function(err, category){
                        category.products.push(result._id);
                        category.save();
                        if(err) res.json({err: err, message: 'the product could not be added'});
                    });
                });
            }
         res.json ({message: 'product created successfully', product: result});
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