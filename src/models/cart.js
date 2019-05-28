const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    items: [{
        item : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product',
        },
        quantity : Number,
        }
        
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    totalCost: Number

})

 module.exports = mongoose.model('cart', cartSchema);

