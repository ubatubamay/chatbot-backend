const multerUpload = require("../multer.config");
const Image = require('../models/Image');
const imageCtrl = {};

imageCtrl.addImage = async (req, res, next) => {
    multerUpload(req, res, function (err) {
        const file = req.body;
        if(file == null || file == undefined || file == ""){ 
            next();
        }else{
            if (err) {
                console.log(err);
            }else{
                console.log(file);
                let image = new Image();
                console.log('filename: '+file.filename);
                console.log('name: '+file.name);
                image.image = file.filename;
                image.save( (image)=> {
                    if(err){
                        console.log(err);
                    }else{  
                        console.log('Imagem salva');
                        res.json(image);
                    }
                });
            }
        }
    });
}



module.exports = imageCtrl;