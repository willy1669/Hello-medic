const Cart = require('../models/cart');
const service = require('../services/cartService');
const healthKit = require('../models/healthKit')


exports.addToCart = (req, res) => {
    console.log(req.body)
    data = {
        product: req.body.product,
        quantity: req.body.quantity
    }
    try {
        return service.addToCart(req, res, data, req.body.price)
    }
    catch(exception) {
        console.log('Error:'+exception)
    }
}

exports.getAllCarts = (req, res) => {
    try {
        return service.getAllCarts(req, res, {});
    } catch(exception) {
        console.log("Error : "+exception);
    }
}


exports.checkOut = (req, res) => {
    user = req.body.user;
    return service.checkOut(req, res, user)
}
