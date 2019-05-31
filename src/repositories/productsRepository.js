var model = require('../models/products');
var baseRepository = require('../repositories/baseRepository');

function productsRepository ()  {

}
productsRepository.prototype = baseRepository(model);
module.exports = new productsRepository();