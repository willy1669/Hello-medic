const Cart = require('../models/cart');
const service = require('../services/cartService');
const healthKit = require('../models/healthKit')


exports.addToCart = (req, res) => {
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
    cartTemporaryId = req.body.cartTemporaryId;
    totalPrice = req.body.totalPrice;
    totalHealthKit = req.body.totalHealthKitQuantity;
    return service.checkOut(req, res, user, cartTemporaryId, totalPrice, totalHealthKit)
}
