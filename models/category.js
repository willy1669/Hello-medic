const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
   name: String,
   products: [{
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'products'}]
});

module.exports = mongoose.model('category', categorySchema);