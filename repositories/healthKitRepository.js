var model = require('../models/healthKit');
var baseRepository = require('./baseRepository');

function healthKitRepository ()  {

}
healthKitRepository.prototype = baseRepository(model);

module.exports = new healthKitRepository();