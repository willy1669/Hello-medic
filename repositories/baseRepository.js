function BaseRepository(model){
    if (!model) throw new Error('A model must be provided');
    this.model = model;
}

BaseRepository.prototype.add = function (data, callback) {
    this.model.create(data, callback);
}

BaseRepository.prototype.getAll = (options, columns, callback) => {
    console.log("model", this.model)
    this.model.find(options, columns, callback);
    
}

BaseRepository.prototype.getById = function(id, callback){
    this.model.findById(id, callback);
}

BaseRepository.prototype.update= (id, options, callback) => {
    this.model.findByIdAndUpdate(id, options, callback);
}

module.exports = (model) =>{
    return new BaseRepository(model);
}