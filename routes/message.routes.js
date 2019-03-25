const express = require('express');
const router = express.Router();

const message = require('../controllers/message.controller');

router.get('/', message.getMessages);
router.get('/:messageName', message.findMessage);
router.post('/', message.addMessage);

module.exports = router;