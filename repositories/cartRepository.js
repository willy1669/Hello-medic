var model = require('../models/cart');
var baseRepository = require('../repositories/baseRepository');

function cartRepository ()  {

}
cartRepository.prototype = baseRepository(model);

module.exports = baseRepository(model);