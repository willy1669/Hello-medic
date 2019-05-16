const repository = require('../repositories/categoryRepository');
const model = require('../models/category');
//const products = require('../models/products')

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
            if(err) res.status(500).json({err: err, message: 'Data could not be fetched'});
            else if (result){
                res.json(result);
            }else{
                res.status(404).json({message: 'Not found'});
            }
        }catch(exception){
            res.status(520).json({error:exception});
        } 
    })
     
   
        // console.log("Populated products", results);
        // if (err) {
        //     res.json({err: 'Oops! There is no result for your search'});
        // }
        // else {
        //     res.json({products: results});
        // }
       
    
}

// exports.searchByCategory = (req, res, option) => {
//     model.findOne({"_id": option})
//     .populate('products')
//     .exec((err, result) => {
//         console.log("results", result)
//         if (!result) {
//             res.json({err: 'Oops! There is no result for your search'});
//         }
//         else if (result.length >= 1){
//             res.json(result.products);
//         }
//         else {
//             res.json({message: 'Not found'})
//         }
//     })
// }