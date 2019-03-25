const express = require('express');
const router = express.Router();

const image = require('../controllers/image.controller');

router.post('/', image.addImage);

module.exports = router;