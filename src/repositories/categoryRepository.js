var model = require('../models/category');
var baseRepository = require('../repositories/baseRepository');

function categoryRepository ()  {

}
categoryRepository.prototype = baseRepository(model);
module.exports = new categoryRepository();