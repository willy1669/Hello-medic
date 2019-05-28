const mongoose = require('mongoose');

const firstAidSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
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
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
})

module.exports = mongoose.model('firstAid', firstAidSchema);