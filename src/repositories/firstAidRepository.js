var model = require('../models/firstAid');
var baseRepository = require('../repositories/baseRepository');

function firstAidRepository ()  {

}
firstAidRepository.prototype = baseRepository(model);

module.exports = baseRepository(model);