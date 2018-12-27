
const express = require('express');
const router = express.Router({ mergeParams: true });
const checkRequest = require('../../middlewares/CheckRequest')
const { registerValidator, loginValidator } = require('../../validations/publicRoutes');

router.use('/Register', registerValidator, checkRequest, require('./Register'));
router.use('/Login', loginValidator, checkRequest, require('./Login'));

module.exports = router;