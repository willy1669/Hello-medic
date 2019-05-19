const repository = require ('../repositories/cartRepository');
const model = require('../models/cart');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const productModel = require('../models/products')
const mongoose = require('mongoose');

exports.addToCart = (req, res, singleKit, price) => {
    //console.log(String(singleKit.product))
    
    //productModel.findOne({productId: singleKit.item}).exec((err, product) => {
    productModel.findOne({"_id": singleKit.product}).exec((err, products) => {
        console.log(singleKit.product)
        console.log(String(singleKit.quantity))
        if (err) {
            res.json({err: err})
        }
        else {
            if(products) {
                if (products.price != Number(price)) {
                    res.json({message: "invalid price"})
                } 
                else {
                    model.findOne({"_id": req.cartTemporaryId}).exec((err, currentCart) => { 
                        if (currentCart == null) { 
                            var newCart  = new model();
                            newCart._id = mongoose.Types.ObjectId(req.cartTemporaryId);
                            newCart.items = [products];
                            console.log("product", products)
                            newCart.totalCost = price * singleKit.quantity
                            newCart.items[0].quantity = singleKit.quantity
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
                            console.log("updating new cart", products);
                            console.log(currentCart.totalCost)
                            //console.log(currentCart.items)
                                var exist = false;
                            currentCart.items.forEach(kit => {
                                if (kit._id.toString() === products._id.toString()) {
                                    console.log("Product", products)

                                    kit.quantity += Number(singleKit.quantity)//+ currentCart.singleKit.quantity
                                    console.log('-------------------------------------')
                                    console.log('-------------------------------------')
                                    console.log("kit Quantity", kit.quantity)
                                    currentCart.totalCost += (Number(products.price) * Number(singleKit.quantity))
                                    exist = true;
                            
                                    console.log("update complete")
                                }
                            });
                            
                            if (!exist) {
                                console.log("quan", Number(singleKit.quantity))
                                currentCart.items.quantity = Number(singleKit.quantity);
                                currentCart.totalCost += (Number(price) * Number(singleKit.quantity));
                                currentCart.items.push(products);
                                
                                
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
                                           
exports.checkOut =  (req, res, user) => {
    userModel.findOne({_id: user}).exec((err, userData) => {
        console.log('userData', userData)
        if (userData) {
            model.findOne({"_id": req.cartTemporaryId}).exec((err, cartData) => {
                if (cartData) {
                    res.json({cartDetails: cartData, user: user})
                }
            })
        }
    })
    
}

exports.getAllCarts = (req, res, options) => {
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
                        res.jso({data: result,})
                    }
                })
            }
        }
    })
}
