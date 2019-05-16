const repository = require ('../repositories/cartRepository');
const model = require('../models/cart');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const productModel = require('../models/products')
const mongoose = require('mongoose');

exports.addToCart = (req, res, singleKit, price) => {
    console.log(String(singleKit.product))
    
    //productModel.findOne({productId: singleKit.item}).exec((err, product) => {
    productModel.findOne({productId: singleKit.product}).exec((err, product) => {
        console.log(singleKit.product)
        console.log(String(singleKit.quantity))
        if (err) {
            res.json({err: err})
        }
        else {
            if(product) {
                if (product.price != Number(price)) {
                    res.json({message: "invalid price"})
                } 
                else {
                    model.findOne({"_id": req.cartTemporaryId}).exec((err, currentCart) => { 
                        if (currentCart == null) { 
                            var newCart  = new model();
                            newCart._id = mongoose.Types.ObjectId(req.cartTemporaryId);
                            newCart.items = [product];
                            newCart.totalCost = product.price * singleKit.quantity
                            console.log(String(singleKit.quantity))
                            newCart.save((err) => {
                                if (err) { 
                                    res.json({message: 'eRROR', token : token, data : err})
                                } 
                                else { 
                                    res.json({message: 'item added to cart', token :token, data : newCart, token_id: token._id})
                                }
                            });
                        } 
                        else {
                            console.log("updating new cart", product);
                            console.log(currentCart.totalCost)
                            //console.log(currentCart.items)
                                var exist = false;
                            currentCart.items.forEach(kit => {
                                if (kit._id.toString() === product._id.toString()) {
                                    console.log("Product", product)

                                    kit.quantity += Number(product.quantity)//+ currentCart.singleKit.quantity
                                    console.log('-------------------------------------')
                                    console.log('-------------------------------------')
                                    console.log("kit Quantity", kit.quantity)
                                    currentCart.totalCost += (Number(product.price) * Number(product.quantity))
                                    exist = true;
                                    console.log("update complete")
                                }
                            });
                            
                            if (!exist) {
                                currentCart.totalCost += (Number(product.price) * Number(product.quantity)); 
                                currentCart.items.push(product);
                            }
                            console.log("check update")
                            console.log(currentCart)
                            delete currentCart._id;
                            console.log(currentCart)
                            console.log("update overchecked")
                            // model.findOneAndUpdate({_id : req.cartTemporaryId}, currentCart).exec((err,updatedKit)=>{
                            //     console.log(updatedKit)
                                
                            //     if (err) { 
                            //         res.json(err)
                            //     }
                            //     else {
                            //         res.status(200).send({message: 'cart updated', token : token, data : updatedKit})
                            //     }
                            // });
                            currentCart.save((err) => {
                                if (err) {
                                    res.json({err: err})
                                }
                                else {
                                    res.json({message: 'cart updated', token : token, data: currentCart})
                                }
                            })
                                
                        }
                    })
                }
            }
            else {
                res.json({message : "product could not be found"})
                                    
            }
        }
        
    }) 
    var token = req.token;
    
}
                                           
exports.checkOut = (req, res, user, cartTemporaryId, totalPrice) => {
    userModel.findOne({_id: user}).exec((err, userData) => {
        console.log('userData', userData)
            if (userData) {
            model.findOne({_id: req.cartTemporaryId}).exec((err, cartData) => {
                console.log("details", req.cartTemporaryId)
                if (cartData) {
                    res.json(cartData)
                    
                }
            })
        }
    
    })
}

exports.getAllCarts = function(req, res, options) {
    model.find(options, '-__v', function(err, cart) {
        if (err) res.json({err:err, message:'error, could not retrieve healthKit'});
        res.json(cart);
    });
} 

exports.deleteAProductFromCart = (req, res, cart, product) => {
    model.findOne(cart).exec((err, result) => {
        if (err) {
            res.json({err: err})
        }
        else {
            if (result) {
                productModel.findByIdAndRemove(product).exec((err, newProduct) => {
                    if (err) {
                        res.json({err: err})
                    }
                    else {
                        res.jso({data: result})
                    }
                })
            }
        }
    })
}
