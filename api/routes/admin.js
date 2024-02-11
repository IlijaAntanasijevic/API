const express = require("express");
const router = express.Router();
const checkAuthorization = require('../helpers/check-authorization');

const adminController = require('../controller/admin');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.delete('/:adminID', checkAuthorization ,adminController.delete);

module.exports = router;