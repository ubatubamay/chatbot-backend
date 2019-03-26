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
    var filePath = 'uploads/' + req.params.filename;
    if(req.params.mimetype == 'image'){
        res.writeHead(200, {
            'Content-Type': req.params.mimetype+'/'+req.params.imtype,
            'Content-Length': req.params.size
        });
        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        res.download(filePath);
    }    
}



module.exports = imageCtrl;