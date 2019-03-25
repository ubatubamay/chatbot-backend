const fileSystem = require('fs');
const upload = require("../multer.config");
const imageCtrl = {};

imageCtrl.addImage = async (req, res, next) => {
    upload(req, res, function (err) {
        const file = req.file;
        if(file == null || file == undefined || file == ""){ 
            next();
        }else{
            if (err) {
                console.log(err);
            }else{
                res.json(file);
            }
        }
    });
}

imageCtrl.getImage = async (req, res, next) => {    
    var filePath = 'uploads/'+req.params.filename;
    var stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    });
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
}



module.exports = imageCtrl;