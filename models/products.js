const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
    inStock: Boolean,
    productImage: String,
    productImageID: String,
    productId: {
        type    : mongoose.Schema.Types.ObjectId,
        default : mongoose.Types.ObjectId,
        index   : { unique: true }
      },
    
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