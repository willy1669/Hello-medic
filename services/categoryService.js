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
                        productModel.findOne(product, function (err, item) {
                            if (item) {
                                res.json({data: item})
                                
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
                    
                

