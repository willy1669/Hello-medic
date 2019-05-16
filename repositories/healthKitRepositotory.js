var model = require('../models/healthKit');
var baseRepository = require('../repositories/baseRepository');

function healthKitRepository ()  {

}
healthKitRepository.prototype = baseRepository(model);

module.exports = new healthKitRepository();