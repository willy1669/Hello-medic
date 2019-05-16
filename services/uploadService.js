//process for uploading images
var multer = require('multer');

//adjust how files are stored
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        //Sets destination for fileType
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            callback(null, '../uploads/thumbnails/');
        }else {
            callback(null);
        };
    },

    //sets what the file should be named inside the folder
    filename: function (req, file, callback){

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            callback(null, 'thumbnail_'+ file.originalname);
        }else {
            callback(null);
        };
    },
});

var fileFilter = function(req, file, callback){
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        //accept a file
        callback(null, true);
    } else if (file.mimetype === 'application/pdf'){
        callback(null, true);
    } else {
        //reject a file
        callback(new Error('Image upload failed. Supports only jpeg and png'), false);
    }    
}

//sets the file size allowed
var fileSize = function(){
    var size = 1024 * 1024 * 15;
    if (file.mimetype === 'application/pdf'){
        size = 1024 * 1024 * 250;
        return size;
    }else return size;
}

exports.upload = multer({
    storage: storage, 
    limits: { 
        fileSize: fileSize
    },
    fileFilter: fileFilter
});
