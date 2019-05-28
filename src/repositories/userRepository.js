var model = require('../models/user');
var baseRepository = require('../repositories/baseRepository');

function userRepository ()  {

}
userRepository.prototype = baseRepository(model);

module.exports = new userRepository();