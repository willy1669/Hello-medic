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

exports.getAcategory = (req, res, category) => {
    model.findOne({"name" : {$regex: category, $options: 'i'}} , 
    function(err, result){
        console.log('results', result)
        try{    
            if(err) {
                res.json ({err: err, message: 'Data could not be fetched'});
            }
            else {
                if (result !== null) {
                    result.products.forEach(product => {
                        productIndex = 0
                        productModel.findOne(product,  function (err, item) {
                            var results = [];
                            productIndex++;
                            console.log("productIndex", productIndex)
                            if (err) {
                                res.json({err: err})
                            }
                            else {
                                if (productIndex <= result.products.length) {
                                    console.log("productIndex", result.products)
                                    results.push(item)
                                    console.log(results)
                                    res.json({data: results})
                                }
                                //  res.json({data: results})
                            }
                        }) 
                        
                    });
                }
            }
        } 
        catch(exception) {
            res.status(520).json({error:exception});
        } 
    })
}
                    
                

