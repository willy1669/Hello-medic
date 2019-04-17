const mongoose = require('mongoose');

const healthKitSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'},
    healthKitCount: Number,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addmin'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }
})

module.exports = mongoose.model('healthKit', healthKitSchema);