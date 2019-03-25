const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/', user.getUsers);
router.get('/:userName', user.findUser);
router.post('/', user.addUser);

module.exports = router;