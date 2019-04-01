const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

router.delete('/messages', async function (req, res) {
    await Message.deleteMany((err)=>{
        if(err) return res(err);
        return res.json({message:"OK"});
    });    
})

module.exports = router;