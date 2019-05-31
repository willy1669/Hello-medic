const repository = require('../repositories/categoryRepository');
const model = require('../models/category');
const productModel = require('../models/products')

exports.createCategory =  (req, res, name) => {
    model.create(name, (err, result) => {
        if (err) {
            res.json ({err: err, message: 'Error, category could not be created', });
        } 
        else {
         res.json ({message: 'category created successfully', categoryname: result});
        }
    })
}

exports.getAllCategories = function(req, res, options) {
    model.find(options, '-__v', function(err, categories) {
        if (err) res.json({err:err, message:'error, could not retrieve categories'});
        res.json(categories);
    });
}

exports.getACategoryById = (req, res, id) => {
    model.findById(id).exec((err, result) => {
        if (err) {
            res.json({err: err})
        }
        else {
            res.json({data: result})
        }
    })
}
                    
                

