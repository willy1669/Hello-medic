var model = require('../models/appointment');
var baseRepository = require('./baseRepository');

function appointmentRepository ()  {

}
appointmentRepository.prototype = baseRepository(model);

module.exports = baseRepository(model);