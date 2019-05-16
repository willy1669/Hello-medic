var cloudinary = require('cloudinary');
var keys = require('./config/keys').clodinary

cloudinary.config({
    cloud_name: 'nonso123',
    api_key: '718354861464973',
    api_secret: 'RceD8SSfVjqHCaK9kuoZyVsbNeE'
});

exports.uploadToCloud = function(filename){
    return new Promise(resolve => {
        cloudinary.uploader.upload(filename, function(result) 
        { 
            //console.log(result);
            resolve({url: result.secure_url, ID: result.public_id});
        });
    });
}

exports.deleteFromCloud = function(publicID){
    return new Promise(resolve => {
        cloudinary.uploader.destroy(publicID, function(result){
            resolve(result);
        });
    });
}