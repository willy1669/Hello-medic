var model = require('../models/doctor');
var baseRepository = require('../repositories/baseRepository');

function doctorRepository ()  {

}
doctorRepository.prototype = baseRepository(model);
module.exports = new doctorRepository();