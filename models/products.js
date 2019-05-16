const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
    productId: {
        type    : mongoose.Schema.Types.ObjectId,
        default : mongoose.Types.ObjectId,
        index   : { unique: true }
      },
    // {type: Number, default: function() {
    //     return Math.floor(Math.random()*900000000300000000000) + 1000000000000000
    //   }},
    categories : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'},
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addmin'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
})

module.exports = mongoose.model('product', productSchema); 