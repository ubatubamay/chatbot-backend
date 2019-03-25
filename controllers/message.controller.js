const multerUpload = require("../multer.config");

const Message = require('../models/Message');
const Image = require('../models/Image');
const messageCtrl = {};


messageCtrl.getMessages = async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
}

messageCtrl.findMessage= async (req, res) => {
    const messageName =  req.params.messageName;
    const message = await Message.findOne({messageName: messageName});
    res.json(message);
}

messageCtrl.addMessage = async (req, res) => {
    console.log(req.body.message);
    message = new Message(req.body.message);
    if (req.body.message.file) {
        console.log(message.file);
        // const fileToSave = await multerUpload(req, res, function (err) {
        //     const file = req.body.message.file;
        //     if(file == null || file == undefined || file == ""){ 
        //         next();
        //     }else{
        //         if (err) {
        //             console.log(err);
        //         }else{
        //             console.log(file);
        //             let image = new Image();
        //             image.image = file.filename;
        //             image.save( (image)=> {
        //                 if(err){
        //                     console.log(err);
        //                 }else{  
        //                     console.log('Imagem salva');
        //                     return image;
        //                 }
        //             });
        //         }
        //     }
        // });
        // message.image = fileToSave;        
        // message.save((err, data) => {
        //     if(err) return console.log(err);
        //     res.json({status: 'Message added'});
        // });
    }else{
        // message.save((err, data) => {
        //     if(err) return console.log(err);
        //     res.json({status: 'Message added'});
        // });
        console.log('entrou no else do file');
    }
}



module.exports = messageCtrl;