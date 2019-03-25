const express = require('express');
const router = express.Router();

const image = require('../controllers/image.controller');

router.get('/:filename', image.getImage);
router.post('/', image.addImage);

module.exports = router;