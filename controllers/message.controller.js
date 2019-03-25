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
    message = new Message(req.body.message);
    message.save((err, data) => {
        if(err) return console.log(err);
        res.json({status: 'Message added'});
    });
}



module.exports = messageCtrl;